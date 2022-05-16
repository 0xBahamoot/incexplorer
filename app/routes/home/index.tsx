import { Title, Space } from '@mantine/core';
import SummaryCard from '~/components/summarybox/summarybox';
import TxListCard from '~/components/txlistcard/txlistcard';
function Home() {

  return (
    <>
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal' }}>Overview</Title>
      <SummaryCard></SummaryCard>
      <Space h="md" />
      <Title order={3} style={{ color: '#fff' }}>Transaction</Title>
      <Space h="md" />
      <TxListCard title={"Latest Transactions"}></TxListCard>
    </>

  );
}

export default Home;