import { Component, HostBinding, Input } from '@angular/core';
import { FileInfo } from '@capacitor/filesystem';
import { FilesService } from '../../services/files.service';
import { Session } from '../../models/session';

@Component({
  selector: 'app-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss'],
})
export class SessionItemComponent {
  get file(): FileInfo | undefined {
    return this._file;
  }

  session: Session | undefined;

  @Input()
  set file(value: FileInfo | undefined) {
    if (value?.type === 'file') {
      this.filesService.openFileByFile(value).then((result) => {
        this.session = result;
      });
    }
    this._file = value;
  }

  constructor(private filesService: FilesService) {}

  private _file: FileInfo | undefined;
  @Input() goBack: boolean = false;
  @HostBinding('class') class = 'ripple';

  @HostBinding('class.selected') private _selected: boolean = false;
  get selected(): boolean {
    return this._selected;
  }

  @Input()
  set selected(value: boolean) {
    this._selected = value;
  }

  protected readonly console = console;
}