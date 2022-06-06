import {
  Text,
  Group,
  Space,
  Loader,
  Paper,
  Grid,
  ScrollArea,
  Box,
  MediaQuery,
} from "@mantine/core";
import BlockListCard from "~/components/blocklistcard/blocklistcard";
import { getBlocks } from "~/services/chains";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { BlockData } from "~/types/types";
import { useState, useEffect } from "react";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import useStyles from "./styles";

export const loader: LoaderFunction = async () => {
  let blockList: BlockData[];
  const { Result, Error } = (await getBlocks(-1)) as any;
  blockList = Result;
  return blockList;
};

function BeaconDetail() {
  const loaded = true;
  const { classes } = useStyles();

  const loaderData = useLoaderData();

  const [data, setData] = useState(loaderData);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentProducer, setCurrentProducer] = useState(0);

  // if (loaderData.length > 0) {
  //   ;
  // }

  useEffect(() => {
    setData(loaderData);
    setCurrentHeight(loaderData[0].Height);
    setCurrentProducer(loaderData[0].BlockProducer);
  }, [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/chain/beacon?index");
    }, 2 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
      setCurrentHeight(fetcher.data[0].Height);
      setCurrentProducer(fetcher.data[0].BlockProducer);
    }
  }, [fetcher.data]);

  //TODO
  return (
    <>
      <Space h={30} />

      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <div>
          <Box style={{ padding: "0 30px" }}>
            <Group>
              <SectionTitle text="Beacon Chain" />
            </Group>
            <Space h="md" />
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
            >
              <Box className={classes.boxInfo}>
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
                  </div>
                </Group>
                <Text className={classes.producerText}>{currentProducer}</Text>
              </Box>
            </ScrollArea>
          </Box>
        </div>
      </MediaQuery>

      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <div>
          <Box style={{ padding: "0 16px" }}>
            <Group>
              <SectionTitle text="Beacon Chain" />
            </Group>
            <Space h="md" />
          </Box>
          <Box style={{ padding: "0" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
            >
              <Box className={classes.boxInfo}>
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
                  </div>
                </Group>
                <Text className={classes.producerText}>{currentProducer}</Text>
              </Box>
            </ScrollArea>
          </Box>
        </div>
      </MediaQuery>
      <Space h="xl" />

      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <Group>
            <SectionTitle text="Most recent blocks" />{" "}
          </Group>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 16px" }}>
          <Group>
            <SectionTitle text="Most recent blocks" />{" "}
          </Group>
        </Box>
      </MediaQuery>

      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>
      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
            >
              <BlockListCard blocklist={data}></BlockListCard>
            </ScrollArea>
          </div>
        </Box>
      </MediaQuery>
      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 0" }}>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
            >
              <BlockListCard blocklist={data}></BlockListCard>
            </ScrollArea>
          </div>
        </Box>
      </MediaQuery>
      <Space h="sm" />
    </>
  );
}

export default BeaconDetail;
