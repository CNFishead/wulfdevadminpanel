import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import DashboardView from '@/views/dashboard/Dashboard.view';
import { Button } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Howard Admin Panel</title>
        <meta name="description" content="Howard Admin Panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout
        pages={[navigation().home.links.dashboard]}
        largeSideBar={true}
      >
        <DashboardView />
      </PageLayout>
    </>
  );
};

export default Dashboard;
