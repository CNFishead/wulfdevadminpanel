import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CertificateList from '@/views/certificate/CertificateList.screen';
import CertificateDetails from '@/views/certificate/certificateDetails/CertificateDetails.view';
const Certificates = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.certificates]}
        largeSideBar={true}
      >
        <CertificateDetails />
      </PageLayout>
    </>
  );
};

export default Certificates;
