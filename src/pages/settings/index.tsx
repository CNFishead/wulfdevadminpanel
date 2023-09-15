import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
const Settings = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().account.links.settings]}
        largeSideBar={true}
      >
        <></>
      </PageLayout>
    </>
  );
};

export default Settings;
