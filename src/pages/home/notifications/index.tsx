import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import NotificationsView from '@/views/notifications/NotificationsView.view';

const Notifications = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().home.links.notifications]}
        largeSideBar={true}
      >
        <NotificationsView />
      </PageLayout>
    </>
  );
};

export default Notifications;
