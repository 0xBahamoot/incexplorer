import { Title, Space, Button, Loader, Group } from '@mantine/core';
import SummaryCard from '~/components/summarybox/summarybox';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx } from '~/services/transactions';
import { Link } from 'react-router-dom';
function Home() {

  const [txListData, setTxListData] = useState<any>([]);
  const [loaded, setLoaded] = useState(false)

  const handleFetchData = async () => {
    setLoaded(false);
    const { Result } = (await getNormalTx(1)) as any;
    setTxListData(Result.Data);
    setLoaded(true);
  }
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal' }}>Overview</Title>
      <SummaryCard></SummaryCard>
      <Space h="md" />
      <Title order={3} style={{ color: '#fff' }}>Transaction</Title>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <TxListCard txlist={txListData}></TxListCard>
      </div>
      <Space h="sm" />
      <Button variant="subtle" radius="xl" compact style={{ display: 'table', margin: '0 auto' }} component={Link} to="/txs">
        view all
      </Button>
      <Space h="md" />
    </>

  );
}

export default Home;