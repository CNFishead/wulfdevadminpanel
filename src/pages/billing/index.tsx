import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import BillingView from '@/views/billing/Billing.view';
const Billing = () => {
  return (
    <>
      <PageLayout pages={[navigation().account.links.billing]}>
        <BillingView />
      </PageLayout>
    </>
  );
};

export default Billing;
