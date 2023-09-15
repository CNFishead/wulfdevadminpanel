import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import SubscribersView from '@/views/subscribers/Subscribers.view';

const Subscribers = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.subscribers]}>
        <SubscribersView />
      </PageLayout>
    </>
  );
};

export default Subscribers;
