import {TinyNavigation} from '@tiny/types';

export const navigation: TinyNavigation[] = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'to-do',
        title: 'To-Do',
        translate: 'NAV.TODO',
        type: 'item',
        icon: 'check_box',
        url: '/apps/todo',
        badge: {
          title: '3',
          bg: '#FF6F00',
          fg: '#FFFFFF'
        }
      }
    ]
  }
];
