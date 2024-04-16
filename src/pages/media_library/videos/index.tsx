import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import Videos from '@/views/media_library/videosScreen/Videos.screen';
const VideosPage = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().media_library.links.videos]}
        largeSideBar={true}
      >
        <Videos />
      </PageLayout>
    </>
  );
};

export default VideosPage;
