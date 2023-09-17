import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ImagesScreen from '@/views/media_library/imagesScreen/ImagesScreen.screen';
const ImagesPage = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().media_library.links.images]}
        largeSideBar={true}
      >
        <ImagesScreen />
      </PageLayout>
    </>
  );
};

export default ImagesPage;
