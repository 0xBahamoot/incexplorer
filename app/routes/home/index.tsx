import { Title, Space, Button, Loader, Group, ScrollArea } from '@mantine/core';
import SummaryBox from '~/components/summarybox/summarybox';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx } from '~/services/transactions';
import { Link } from 'react-router-dom';
import { getDashboard, getSummary } from '~/services/summary';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
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
    setTxListData(Result.Data.slice(0, 10));
    setLoaded(true);
  }

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <SectionTitle text='Network' />

      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={networkData}></SummaryBox>
      </div>
      <Space h={40} />
      <SectionTitle text='Privacy Exchange' />
      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={pdexData}></SummaryBox>
      </div>
      <Space h={40} />
      <SectionTitle text='PRV' />
      <Space h="sm" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <SummaryBox items={prvData}></SummaryBox>
      </div>

      <Space h={40} />
      <Group position='apart'>
        <SectionTitle text='Transaction' />
        <Button color='gray' variant="subtle" radius="xl" compact component={Link} to="/txs" style={{ marginRight: 10, color: '#757575' }}>
          view all &#62;
        </Button>
      </Group>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>
      <ScrollArea style={{ height: loaded ? 'auto' : 0, borderRadius: 12, paddingRight: 10 }} >
        <TxListCard txlist={txListData}></TxListCard>
      </ScrollArea>

      <Space h="sm" />
      <Space h="md" />
    </>

  );
}

export default Home;