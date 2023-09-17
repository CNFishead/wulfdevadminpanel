import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ProjectScreen from '@/views/projects/Projects.screen';

const Projects = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.projects]}
        largeSideBar={true}
      >
        <ProjectScreen />
      </PageLayout>
    </>
  );
};

export default Projects;
