import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ImagesScreen from '@/views/media_library/imagesScreen/ImagesScreen.screen';
import CloudinaryImages from '@/views/media_library/cloudinary/CloudinaryImages.screen';
const ImagesPage = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().media_library.links.images]}
        largeSideBar={true}
      >
        <CloudinaryImages />
      </PageLayout>
    </>
  );
};

export default ImagesPage;
