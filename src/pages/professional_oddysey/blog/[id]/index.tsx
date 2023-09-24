import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import BlogDetails from '@/views/blog/blogDetails/BlogDetails.view';
const Blog = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().professional_oddysey.links.blog]}
        largeSideBar={true}
      >
        <BlogDetails />
      </PageLayout>
    </>
  );
};

export default Blog;
