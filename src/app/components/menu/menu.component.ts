import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { Action } from '../../models/action';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  get attachTo(): ElementRef | undefined {
    return this._attachTo;
  }

  @Input()
  set attachTo(value: ElementRef | undefined) {
    this._attachTo = value;
    var curleft = 0;
    var curtop = 0;
    let obj = value?.nativeElement;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while ((obj = obj.offsetParent));
      this.x = curleft;
      this.y = curtop;
    }
  }

  private _attachTo: ElementRef | undefined;

  x: number = 0;
  y: number = 0;

  @Input() anchorLocation:
    | 'topRight'
    | 'topLeft'
    | 'bottomRight'
    | 'bottomLeft' = 'topRight';

  get menuStyle() {
    console.log('menuStyle', this.attachTo?.nativeElement.offsetWidth);
    switch (this.anchorLocation) {
      case 'topRight':
        return {
          top: `${this.y}px`,
          right: `${
            window.innerWidth -
            (this.attachTo?.nativeElement.offsetWidth + this.x)
          }px`,
        };
      case 'topLeft':
        return {
          top: `${this.y}px`,
          left: `${this.x}px`,
        };
      case 'bottomRight':
        return {
          bottom: `${
            window.innerWidth -
            (this.y + this.attachTo?.nativeElement.offsetHeight)
          }px`,
          right: `${
            window.innerWidth -
            (this.attachTo?.nativeElement.offsetWidth + this.x)
          }px`,
        };
      case 'bottomLeft':
        return {
          bottom: `${
            window.innerWidth -
            (this.y + this.attachTo?.nativeElement.offsetHeight)
          }px`,
          left: `${this.x}px`,
        };
    }
  }

  get originalActions(): Action[] {
    return this._originalActions;
  }

  set originalActions(value: Action[]) {
    console.log('set originalActions', value);
    this._originalActions = value;
  }

  get actions(): Action[] {
    return this._actions;
  }

  @Input()
  set actions(value: Action[]) {
    console.log('set actions', value);
    this._actions = value;
    this.originalActions = value;
    // this.currentActions = value;
  }

  get open(): boolean {
    return this._open;
  }

  @Input()
  set open(value: boolean) {
    console.log('set open', value);
    this._open = value;
    this.currentActions = value ? this._originalActions : this.currentActions;
  }

  @HostBinding('class.open') private _open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _actions: Action[] = [];

  currentActions: Action[] = [];

  private _originalActions: Action[] = [];

  constructor() {}

  close() {
    this.open = false;
    this.openChange.emit(this._open);
  }

  actionClick(action: Action) {
    if (action.actions) {
      this.currentActions = action.actions;
      return;
    }
    if (action.execute() === false) {
      return;
    }
    this.close();
  }
}