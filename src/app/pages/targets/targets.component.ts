import { Component } from '@angular/core';
import { Session } from '../../models/session';
import { Category } from '../../models/category';
import { FilesService } from '../../services/files.service';
import { Event } from '../../models/event';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TargetsComponent {
  searchValue = '';
  openCreateTarget = false;

  get targets() {
    return this.session.users
      .flatMap((user) => {
        return user.targets || [];
      })
      .filter((target) => {
        if (!this.eventFilter) return true;
        return target.event === this.eventFilter;
      });
  }

  eventFilter?: Event = undefined;

  segmentedButtonItems = [
    {
      label: 'TARGETS.SEGMENTED_BUTTON.ALL',
      key: 'all',
      onClick: () => {
        this.eventFilter = undefined;
      },
    },
    {
      label: 'TARGETS.SEGMENTED_BUTTON.PRECISION',
      key: 'precision',
      onClick: () => {
        this.eventFilter = Event.PRECISION;
      },
    },
    {
      label: 'TARGETS.SEGMENTED_BUTTON.BIATHLON',
      key: 'biathlon',
      onClick: () => {
        this.eventFilter = Event.BIATHLON;
      },
    },
    {
      label: 'TARGETS.SEGMENTED_BUTTON.SUPER_BIATHLON',
      key: 'super-biathlon',
      onClick: () => {
        this.eventFilter = Event.SUPER_BIATHLON;
      },
    },
    {
      label: 'TARGETS.SEGMENTED_BUTTON.FREE_INPUT',
      key: 'saisie-libre',
      onClick: () => {
        this.eventFilter = Event.SAISIE_LIBRE;
      },
    },
  ];
  selectedSegmentedButton = 'all';

  menuActions = [];

  selectedTargets: any[] = [];

  session: Session = {
    title: 'Rennes',
    description: 'Description 1',
    date: new Date(),
    users: [
      {
        id: '1',
        firstname: 'User',
        lastname: '1',
        category: Category.SENIOR,
        targets: [
          {
            impacts: [],
            event: Event.SUPER_BIATHLON,
            total: 0,
            time: 0,
            date: new Date(),
            user: '1',
            image: '',
          },
        ],
      },
    ],
    teams: [],
  };

  constructor(private filesService: FilesService, private router: Router) {
    this.session = this.filesService.session || this.session;
  }

  storeCategories = [
    { id: Category.MINIME, label: 'Minime' },
    { id: Category.CADET, label: 'Cadet' },
    { id: Category.JUNIOR, label: 'Junior' },
    { id: Category.SENIOR, label: 'Sénior' },
    { id: Category.MASTER, label: 'Master' },
  ];

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }
}
