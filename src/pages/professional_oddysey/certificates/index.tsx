import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CertificateList from '@/views/certificate/CertificateList.screen';
const Certificates = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.certificates]}
        largeSideBar={true}
      >
        <CertificateList />
      </PageLayout>
    </>
  );
};

export default Certificates;
