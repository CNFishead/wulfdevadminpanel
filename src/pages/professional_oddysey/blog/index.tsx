import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
const Blog = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.blog]}
        largeSideBar={true}
      >
        <></>
      </PageLayout>
    </>
  );
};

export default Blog;
