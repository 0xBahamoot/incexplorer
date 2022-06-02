import { Text, Group, Space, Loader, Paper, Grid, ScrollArea, Box, MediaQuery } from '@mantine/core';
import BlockListCard from '~/components/blocklistcard/blocklistcard';
import { getBlocks } from '~/services/chains';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData } from '~/types/types';
import { useState, useEffect } from 'react';
import SectionTitle from '~/components/sectiontitle/sectiontitle';

export const loader: LoaderFunction = async () => {
  let blockList: BlockData[];
  const { Result, Error } = (await getBlocks(-1)) as any;
  blockList = Result;
  return blockList
};

function BeaconDetail() {
  const loaded = true;

  const loaderData = useLoaderData();

  const [data, setData] = useState(loaderData);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentProducer, setCurrentProducer] = useState(0);

  // if (loaderData.length > 0) {
  //   ;
  // }

  useEffect(() => {
    setData(loaderData)
    setCurrentHeight(loaderData[0].Height)
    setCurrentProducer(loaderData[0].BlockProducer)
  }, [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/chain/beacon?index");
    }, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
      setCurrentHeight(fetcher.data[0].Height)
      setCurrentProducer(fetcher.data[0].BlockProducer)
    }
  }, [fetcher.data]);

  //TODO
  return (
    <>
      <Space h={30} />
      <Box style={{ padding: '0 30px' }}>
        <Group><SectionTitle text="Beacon Chain" /> <Text>|</Text> <Text>Total blocks: {currentHeight}</Text></Group>
        <Space h="md" />
        <Paper radius={12} withBorder style={{ backgroundColor: '#303030', padding: 20 }}>
          <Grid columns={18}>
            <Grid.Col span={6}>Current block producer</Grid.Col>
            <Grid.Col span={12} style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentProducer}</Grid.Col>
          </Grid>
        </Paper>
        <Space h="md" />
        <Group><SectionTitle text="Most recent blocks" /> </Group>
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
          <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
          <ScrollArea style={{ height: 'auto', borderRadius: 12, overflow: 'hidden', border: '1px solid #363636' }} >
            <BlockListCard blocklist={data}></BlockListCard>
          </ScrollArea>
        </div>
      </Box>
      <Space h="sm" />
    </>

  );
}

export default BeaconDetail;