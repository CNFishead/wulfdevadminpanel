import {
  FaBlog,
  FaBriefcase,
  FaCamera,
  FaImage,
  FaProjectDiagram,
} from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import { MdSettings } from 'react-icons/md';
import { RiHome2Fill } from 'react-icons/ri';
import { PiCertificateFill } from 'react-icons/pi';

export const navigation = (options?: { loggedInData?: { user: any } }) => {
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

    professional_oddysey: {
      title: 'Professional Oddysey',
      links: {
        work_history: {
          title: 'Work History',
          link: '/professional_oddysey/work_history',
          icon: <FaBriefcase />,
        },
        projects: {
          title: 'Projects',
          link: '/professional_oddysey/projects',
          icon: <FaProjectDiagram />,
        },
        certificates: {
          title: 'Certificates',
          link: '/professional_oddysey/certificates',
          icon: <PiCertificateFill />,
        },
        blog: {
          title: 'Blog',
          link: '/professional_oddysey/blog',
          icon: <FaBlog />,
        },
      },
    },
    media_library: {
      title: 'Media Library',
      links: {
        images: {
          title: 'Images',
          link: '/media_library/cloudinary',
          icon: <FaImage />,
        },
        videos: {
          title: 'Videos',
          link: '/media_library/videos',
          icon: <FaCamera />,
          disabled: true,
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
