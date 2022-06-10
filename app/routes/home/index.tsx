import {
  Text,
  Space,
  Button,
  Loader,
  Group,
  ScrollArea,
  Box,
  MediaQuery,
} from "@mantine/core";
import SummaryBox from "~/components/summarybox/summarybox";
import TxListCard from "~/components/txlistcard/txlistcard";
import { useState, useEffect } from "react";
import { getNormalTx } from "~/services/transactions";
import { Link } from "react-router-dom";
import {
  getDashboard,
  getSummary,
  getExplorerSummary,
} from "~/services/summary";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import type { LoaderFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import React, { FunctionComponent } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const { data, message } = (await getExplorerSummary()) as any;
  console.log(data);
  return data;
};
type mainContentProps = {
  loaded: boolean,
  networkData: any,
  pdexData: any,
  prvData: any,
  contentPadding: string,
  scroll: boolean
}

export const RenderMainContent: FunctionComponent<mainContentProps> = ({ loaded, networkData, pdexData, prvData, contentPadding, scroll }) => {
  const [toggleNetworkExpand, setToggleNetworkExpand] = useState<boolean>(false);
  const [toggleExchangeExpand, setToggleExchangeExpand] = useState<boolean>(false);
  const [togglePRVExpand, setTogglePRVExpand] = useState<boolean>(false);

  return (
    <>
      <Space h={30} />
      <Box style={{ padding: contentPadding }}>
        <Group position="apart">
          <SectionTitle text="Network" />
          <Button
            color="gray"
            variant="subtle"
            compact
            onClick={() => setToggleNetworkExpand(!toggleNetworkExpand)}
            hidden={!(contentPadding == "0px 16px")}
          >
            <Text style={{ color: !toggleNetworkExpand ? "#1A73E8" : "#757575", fontSize: 16 }}>{!toggleNetworkExpand ? "View all" : "Hide"}</Text>
          </Button>
        </Group>
      </Box>
      <Space h={contentPadding == "0px 16px" ? 6 : "sm"} />

      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div
        style={{
          height: loaded ? "auto" : 0,
          overflow: "hidden",
          padding: contentPadding == "0px 16px" ? "0" : contentPadding,
        }}
      >
        <div hidden={toggleNetworkExpand}>
          <SummaryBox items={networkData} scroll={scroll}></SummaryBox>
        </div>
        <div hidden={!toggleNetworkExpand} style={{ padding: "0 16px" }}>
          <SummaryBox items={networkData} scroll={false}></SummaryBox>
        </div>
      </div>

      <Space h={contentPadding == "0px 16px" ? 24 : 40} />
      <Box style={{ padding: contentPadding }}>
        <Group position="apart">
          <SectionTitle text="Privacy Exchange" />
          <Button
            color="gray"
            variant="subtle"
            compact
            onClick={() => setToggleExchangeExpand(!toggleExchangeExpand)}
            hidden={!(contentPadding == "0px 16px")}
          >
            <Text style={{ color: !toggleExchangeExpand ? "#1A73E8" : "#757575", fontSize: 16 }}>{!toggleExchangeExpand ? "View all" : "Hide"}</Text>
          </Button>
        </Group>
      </Box>
      <Space h={contentPadding == "0px 16px" ? 6 : "sm"} />

      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div
        style={{
          height: loaded ? "auto" : 0,
          overflow: "hidden",
          padding: contentPadding == "0px 16px" ? "0" : contentPadding,
        }}
      >
        <div hidden={toggleExchangeExpand}>
          <SummaryBox items={pdexData} scroll={scroll}></SummaryBox>
        </div>
        <div hidden={!toggleExchangeExpand} style={{ padding: "0 16px" }}>
          <SummaryBox items={pdexData} scroll={false}></SummaryBox>
        </div>
      </div>

      <Space h={contentPadding == "0px 16px" ? 24 : 40} />
      <Box style={{ padding: contentPadding }}>
        <Group position="apart">
          <SectionTitle text="PRV" />
          <Button
            color="gray"
            variant="subtle"
            compact
            onClick={() => setTogglePRVExpand(!togglePRVExpand)}
            hidden={!(contentPadding == "0px 16px")}
          >
            <Text style={{ color: !togglePRVExpand ? "#1A73E8" : "#757575", fontSize: 16 }}>{!togglePRVExpand ? "View all" : "Hide"}</Text>
          </Button>
        </Group>
      </Box>
      <Space h={contentPadding == "0px 16px" ? 6 : "sm"} />

      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <div
        style={{
          height: loaded ? "auto" : 0,
          overflow: "hidden",
          padding: contentPadding == "0px 16px" ? "0" : contentPadding,
        }}
      >
        <div hidden={togglePRVExpand}>
          <SummaryBox items={prvData} scroll={scroll}></SummaryBox>
        </div>
        <div hidden={!togglePRVExpand} style={{ padding: "0 16px" }}>
          <SummaryBox items={prvData} scroll={false}></SummaryBox>
        </div>
      </div>

      <Space h={contentPadding == "0px 16px" ? 24 : 40} />

      <Box style={{ padding: contentPadding }}>
        <Group position="apart">
          <SectionTitle text="Transactions" />
          <Button
            color="gray"
            variant="subtle"
            compact
            component={Link}
            to="/txs"
          >
            <Text style={{ color: "#1A73E8", fontSize: 16 }}>View all</Text>
          </Button>
        </Group>
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
          <Loader
            color="gray"
            size={30}
            style={{ height: !loaded ? 200 : 0 }}
          />
        </Group>
      </Box>
    </>
  );
}

function Home() {
  const fetcher = useFetcher();

  const [txListData, setTxListData] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const [networkData, setNetworkData] = useState<any>([]);
  const [pdexData, setPdexData] = useState<any>([]);
  const [prvData, setPRVData] = useState<any>([]);

  // Get fresh data every 15 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/home?index");
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetcher.load(`/home?index`);
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setLoaded(false);
      console.log("fetcher.data", fetcher.data);
      let networkList: any = [];
      let pdexList: any = [];
      let prvList: any = [];

      fetcher.data.map((item: any) => {
        switch (item.metricType) {
          case "TRADING_VOLUME_TOTAL":
            item.Name = "Trading Volume";
            pdexList.push(item);
            break;
          case "LIQUIDITY":
            item.Name = "Liquidity";
            pdexList.push(item);
            break;
          case "TRADING_VOLUME_24H":
            item.Name = "24h Trading Volume";
            pdexList.push(item);
            break;

          case "TOTAL_VOLUME_LOCK":
            item.Name = "Total Value Locked";
            networkList.push(item);
            break;
          case "SHIELDED_VOLUME":
            item.Name = "Shielded";
            networkList.push(item);
            break;
          case "TOTAL_TX_COUNT":
            item.Name = "Transactions";
            networkList.push(item);
            break;
          case "TX_COUNT_24H":
            item.Name = "24h Tx Count";
            networkList.push(item);
            break;
          case "ACTIVE_VALIDATORS_COUNT":
            item.Name = "Active Validators";
            networkList.push(item);
            break;
          case "BEACON_HEIGHT":
            item.Name = "Beacon Height";
            networkList.push(item);
            break;

          case "TX_COUNT_1H":
            item.Name = "1h Tx Count";
            networkList.push(item);
            break;

          case "PRV_PRICE":
            item.Name = "Price";
            prvList.push(item);
            break;
          case "PRV_CIRCULATING_SUPPLY":
            item.Name = "Circulating Supply";
            prvList.push(item);
            break;
          case "PRV_MARKET_CAP":
            item.Name = "Market Cap";
            prvList.push(item);
            break;

          default:
            break;
        }
      });

      setNetworkData(networkList);
      setPdexData(pdexList);
      setPRVData(prvList);
      handleFetchData();
      setLoaded(true);
    }
  }, [fetcher.data]);

  const handleFetchData = async () => {
    const { Result } = (await getNormalTx(1)) as any;
    setTxListData(Result.Data.slice(0, 10));
  };

  // useEffect(() => {
  //   handleFetchData();
  // }, []);
  return (
    <>
      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <div>
          <RenderMainContent loaded={loaded} networkData={networkData} pdexData={pdexData} prvData={prvData} contentPadding="0px 30px" scroll={false} />
        </div>
      </MediaQuery>

      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <div>
          <RenderMainContent loaded={loaded} networkData={networkData} pdexData={pdexData} prvData={prvData} contentPadding="0px 16px" scroll={true} />
        </div>
      </MediaQuery>

      <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
        <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
          <Box style={{ padding: "0 30px 30px" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
              scrollbarSize={4}
            >
              <TxListCard txlist={txListData}></TxListCard>
            </ScrollArea>
          </Box>
        </MediaQuery>

        <MediaQuery largerThan={1440} styles={{ display: "none" }}>
          <ScrollArea
            style={{
              height: "auto",
              overflow: "hidden",
              paddingBottom: 16,
            }}
            scrollbarSize={4}
          >
            <Box
              style={{
                height: "auto",
                overflow: "hidden",
                border: "1px solid #363636"
              }}
            >
              <TxListCard txlist={txListData}></TxListCard>
            </Box>
          </ScrollArea>
        </MediaQuery>
      </div>
    </>
  );
}

export default Home;
