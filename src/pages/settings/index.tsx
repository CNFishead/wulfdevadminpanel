import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import AccountSettings from '@/views/account_settings/AccountSettings.view';
const Settings = () => {
  return (
    <>
      <PageLayout
        pages={[navigation().account.links.settings]}
        largeSideBar={true}
      >
        <AccountSettings />
      </PageLayout>
    </>
  );
};

export default Settings;
