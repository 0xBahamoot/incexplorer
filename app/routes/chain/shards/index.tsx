import { Title, Group, Space, Loader, Box, Grid } from '@mantine/core';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData, ChainInfo } from '~/types/types';
import { useState, useEffect } from 'react';
import ShardOverviewCard from '~/components/shardoverviewcard/shardoverviewcard';
import { getBlockchainInfo } from '~/services/chains';
import SectionTitle from '~/components/sectiontitle/sectiontitle';

import { useNavigate } from 'react-router-dom';

export const loader: LoaderFunction = async ({ params }) => {
  let blockchainInfo: ChainInfo[] = []
  // var id: any = params.shardid;
  // var chainID: number = parseInt(id);
  const { Result, Error } = (await getBlockchainInfo()) as any;
  // let keys = Array.from(Result.BestBlocks.keys());
  Object.keys(Result.BestBlocks).map(key => {
    if (key == "-1") {
      return <></>;
    }
    blockchainInfo.push(Result.BestBlocks[key]);
  })
  console.log(blockchainInfo);
  return blockchainInfo
};

function ShardsOverview() {

  let navigate = useNavigate();
  const loaded = true;
  const loaderData = useLoaderData();
  const [data, setData] = useState(loaderData);


  useEffect(() => {
    setData(loaderData)
    console.log(loaderData);
    // setCurrentHeight(loaderData[0].Height)
    // setCurrentProducer(loaderData[0].BlockProducer)
  }, [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/chain/shards?index");
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
      // setCurrentHeight(fetcher.data[0].Height)
      // setCurrentProducer(fetcher.data[0].BlockProducer)
    }
  }, [fetcher.data]);

  return (
    <>
      <Space h={30} />
      <Box style={{ padding: '0 30px' }}>
        <Group>
          <SectionTitle text="Shard list" /></Group>
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
          <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>

          <Grid gutter="lg" columns={12}>
            {data.map((item: ChainInfo, idx: number) => (
              <Grid.Col xs={12} sm={6} md={6} lg={4} xl={4} key={item.Hash} onClick={() => {
                console.log("SdfsdF");
                navigate("/chain/shard/" + idx, { replace: true })
              }}>
                <ShardOverviewCard chainInfo={item} chainId={idx} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
        <Space h="sm" />
      </Box>
    </>

  );
}

export default ShardsOverview;