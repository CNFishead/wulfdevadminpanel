import { IoIosNotifications } from 'react-icons/io';
import {
  MdSettings,
} from 'react-icons/md';
import { RiHome2Fill } from 'react-icons/ri';

export const navigation = (options?: {
  loggedInData?: { user: any };
}) => {
  return {
    home: {
      title: 'Home',
      links: {
        dashboard: {
          title: 'Dashboard',
          link: '/home',
          icon: <RiHome2Fill />,
        },
        notifications: {
          title: 'Notifications',
          link: '/home/notifications',
          icon: <IoIosNotifications />,
        },
      },
    },
    account: {
      title: 'Account',
      links: {
        settings: {
          title: 'Account Settings',
          link: '/settings',
          icon: <MdSettings />,
        },
      },
    },
  };
};
