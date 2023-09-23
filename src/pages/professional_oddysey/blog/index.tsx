import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import BlogList from '@/views/blog/BlogList.screen';
const Blog = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.blog]}
        largeSideBar={true}
      >
        <BlogList />
      </PageLayout>
    </>
  );
};

export default Blog;
