import { Title, Space, Button, Loader, Group } from '@mantine/core';
import SummaryBox from '~/components/summarybox/summarybox';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx } from '~/services/transactions';
import { Link } from 'react-router-dom';
import { getDashboard, getSummary } from '~/services/summary';
function Home() {

  const [txListData, setTxListData] = useState<any>([]);
  const [loaded, setLoaded] = useState(false)

  const [networkData, setNetworkData] = useState<any>([]);
  const [pdexData, setPdexData] = useState<any>([]);
  const [prvData, setPRVData] = useState<any>([]);

  const handleFetchData = async () => {
    setLoaded(false);
    let data1 = (await getDashboard()) as any;
    let data2 = (await getSummary()) as any;
    let data = data1.Result;
    data = data.concat(data2.Result);
    console.log(data)
    let networkList: any = [];
    let pdexList: any = [];
    let prvList: any = [];

    await data.map((item: any) => {
      switch (item.Name) {
        case "TRADING VOLUME":
          pdexList.push(item)
          break;
        case "LIQUIDITY":
          pdexList.push(item)
          break;
        case "24H TRADING VOLUME":
          pdexList.push(item)
          break;

        case "SHIELDED":
          networkList.push(item)
          break;
        case "TRANSACTIONS":
          networkList.push(item)
          break;
        case "24H TX COUNT":
          networkList.push(item)
          break;
        case "ACTIVE VALIDATORS":
          networkList.push(item)
          break;
        case "BEACON HEIGHT":
          networkList.push(item)
          break;
        case "1H TX COUNT":
          networkList.push(item)
          break;

        case "PRV PRICE":
          prvList.push(item)
          break;
        case "PRV CIRCULATING SUPPLY":
          prvList.push(item)
          break;
        case "MARKET CAP":
          prvList.push(item)
          break;

        default:
          break;
      }
    })

    setNetworkData(networkList);
    setPdexData(pdexList);
    setPRVData(prvList);
    const { Result } = (await getNormalTx(1)) as any;
    setTxListData(Result.Data);
    setLoaded(true);
  }

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal', fontWeight: 500 }}>Network</Title>

      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={networkData}></SummaryBox>
      </div>
      <Space h={40} />
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal', fontWeight: 500 }}>Privacy Exchange</Title>

      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={pdexData}></SummaryBox>
      </div>
      <Space h={40} />
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal', fontWeight: 500 }}>PRV</Title>

      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={prvData}></SummaryBox>
      </div>

      <Space h={40} />
      <Title order={3} style={{ color: '#fff', letterSpacing: "0.01em", fontStyle: 'normal', fontWeight: 500 }}>Transaction</Title>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <TxListCard txlist={txListData}></TxListCard>
      </div>
      <Space h="sm" />
      <Button color='gray' variant="subtle" radius="xl" compact style={{ display: 'table', margin: '0 auto' }} component={Link} to="/txs">
        view all
      </Button>
      <Space h="md" />
    </>

  );
}

export default Home;