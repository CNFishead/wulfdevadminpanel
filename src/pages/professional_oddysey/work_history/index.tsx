import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import WorkHistoryScreen from '@/views/workHistory/WorkHistory.screen';
const WorkHistory = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.work_history]}
        largeSideBar={true}
      >
        <WorkHistoryScreen />
      </PageLayout>
    </>
  );
};

export default WorkHistory;
