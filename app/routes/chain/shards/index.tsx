import {
  Title,
  Group,
  Space,
  Loader,
  Box,
  Grid,
  MediaQuery,
} from "@mantine/core";
import { ChainInfo } from "~/types/types";
import { useState, useEffect } from "react";
import ShardOverviewCard from "~/components/shardoverviewcard/shardoverviewcard";
import { getBlockchainInfo } from "~/services/chains";
import SectionTitle from "~/components/sectiontitle/sectiontitle";

import { useNavigate } from "react-router-dom";

function ShardsOverview() {
  let navigate = useNavigate();
  const loaded = true;
  const [data, setData] = useState<ChainInfo[]>([]);

  useEffect(() => {
    getBlockchainInfo().then((res) => {
      const { Result, Error } = res as any;
      let blockchainInfo: ChainInfo[] = [];
      Object.keys(Result.BestBlocks).map((key) => {
        if (key == "-1") {
          return <></>;
        }
        blockchainInfo.push(Result.BestBlocks[key]);
      });
      setData(blockchainInfo);
    });
  }, []);

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      getBlockchainInfo().then((res) => {
        const { Result, Error } = res as any;
        let blockchainInfo: ChainInfo[] = [];
        Object.keys(Result.BestBlocks).map((key) => {
          if (key == "-1") {
            return <></>;
          }
          blockchainInfo.push(Result.BestBlocks[key]);
        });
        setData(blockchainInfo);
      });
    }, 40 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Space h={30} />
      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <Group>
            <SectionTitle text="Shard list" />
          </Group>
          <Space h="md" />
          <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader
              color="gray"
              size={30}
              style={{ height: !loaded ? 200 : 0 }}
            />
          </Group>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <Grid gutter="lg" columns={12}>
              {data.map((item: ChainInfo, idx: number) => (
                <Grid.Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  key={item.Hash}
                  onClick={() => {
                    console.log("SdfsdF");
                    navigate("/chain/shard/" + idx, { replace: true });
                  }}
                >
                  <ShardOverviewCard chainInfo={item} chainId={idx} />
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 16px" }}>
          <Group>
            <SectionTitle text="Shard list" />
          </Group>
          <Space h="md" />
          <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader
              color="gray"
              size={30}
              style={{ height: !loaded ? 200 : 0 }}
            />
          </Group>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <Grid gutter="lg" columns={12}>
              {data.map((item: ChainInfo, idx: number) => (
                <Grid.Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  key={item.Hash}
                  onClick={() => {
                    navigate("/chain/shard/" + idx, { replace: true });
                  }}
                >
                  <ShardOverviewCard chainInfo={item} chainId={idx} />
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </Box>
      </MediaQuery>
      <Space h="sm" />
    </>
  );
}

export default ShardsOverview;
