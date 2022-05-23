import { Text, Group, Space, Loader, Paper, Grid } from '@mantine/core';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData, ChainInfo } from '~/types/types';
import { useState, useEffect } from 'react';
import ShardOverviewCard from '~/components/shardoverviewcard/shardoverviewcard';
import { getBlockchainInfo } from '~/services/chains';

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
      <Group><Text size="xl" color={"#fff"} style={{ fontWeight: 'bold' }}>Shard List</Text></Group>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>
      <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
        <Grid gutter="lg" columns={12}>
          {data.map((item: ChainInfo, idx: number) => (
            <Grid.Col span={4} key={item.Hash}>
              <ShardOverviewCard chainInfo={item} chainId={idx} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <Space h="sm" />
    </>

  );
}

export default ShardsOverview;