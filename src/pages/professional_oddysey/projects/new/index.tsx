import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ProjectDetails from '@/views/projects/projectDetails/ProjectDetails.screen';

const Projects = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.projects]}
        largeSideBar={true}
      >
        <ProjectDetails />
      </PageLayout>
    </>
  );
};

export default Projects;
