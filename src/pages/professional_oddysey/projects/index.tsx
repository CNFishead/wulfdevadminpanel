import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
const Projects = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.projects]}
        largeSideBar={true}
      >
        <></>
      </PageLayout>
    </>
  );
};

export default Projects;
