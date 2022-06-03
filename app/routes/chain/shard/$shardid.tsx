import { Text, Group, Space, Loader, Paper, Grid, ScrollArea, Box } from '@mantine/core';
import BlockListCard from '~/components/blocklistcard/blocklistcard';
import { getBlocks } from '~/services/chains';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData } from '~/types/types';
import { useState, useEffect } from 'react';

import { useParams } from "@remix-run/react";
import SectionTitle from '~/components/sectiontitle/sectiontitle';

export const loader: LoaderFunction = async ({ params }) => {
  let blockList: BlockData[];
  var id: any = params.shardid;
  var chainID: number = parseInt(id);
  const { Result, Error } = (await getBlocks(chainID)) as any;
  console.log(Result);
  blockList = Result;
  return blockList
};

function ShardDetail() {
  const params = useParams();
  const chainID = params.shardid;

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

  return (
    <>
      <Space h={30} />
      <Box style={{ padding: '0 30px' }}>
        <Group>
          <SectionTitle text={"Shard " + chainID} />
        </Group>
        <Space h="md" />
        <Box
          style={{
            padding: 0,
            border: "1px solid #363636",
            borderRadius: 12,
            display: "block",
            overflow: "hidden",
          }}
        >
          <Group
            position="apart"
            style={{ backgroundColor: "#363636", padding: "9px 24px" }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 16,
                color: "#9C9C9C",
              }}
            >
              Current block producer
            </Text>
            <div style={{ width: "auto", overflow: "hidden" }}>
              <Text style={{ color: "#9C9C9C", fontWeight: 500 }}>
                Total blocks:{" "}
                <span style={{ color: "#fff", fontWeight: 500 }}>
                  {currentHeight}
                </span>
              </Text>
              {/* <Text style={{ color: "#fff" }}></Text> */}
            </div>
          </Group>
          <Text
            style={{
              color: "#fff",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: "80%",
              padding: "14px 24px",
              fontWeight: 500,
            }}
          >
            {currentProducer}
          </Text>
        </Box>

        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
          <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>

          <ScrollArea style={{ height: 'auto', borderRadius: 12, overflow: 'hidden', border: '1px solid #363636' }} >
            <BlockListCard blocklist={data} blockType='shardblk'></BlockListCard>
          </ScrollArea>
        </div>
      </Box>
      <Space h="sm" />
    </>

  );
}

export default ShardDetail;