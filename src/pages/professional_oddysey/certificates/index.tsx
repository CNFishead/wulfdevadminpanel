import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
const Certificates = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.certificates]}
        largeSideBar={true}
      >
        <></>
      </PageLayout>
    </>
  );
};

export default Certificates;
