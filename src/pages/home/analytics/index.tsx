import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import { FEATURES } from '@/utils/hasFeature';
import AnalyticsView from '@/views/analytics/Analytics.view';

const Analytics = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.videoAnalytics]} enableBlockCheck>
        <AnalyticsView />
      </PageLayout>
    </>
  );
};

export default Analytics;
