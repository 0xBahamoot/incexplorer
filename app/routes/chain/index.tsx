import {
  Text,
  Group,
  Space,
  Loader,
  Grid,
  Table,
  ScrollArea,
  Box,
  MediaQuery,
} from "@mantine/core";
import SummaryCard from "~/components/summarycard/summarycard";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { ChainInfo } from "~/types/types";
import { useState, useEffect } from "react";
import { getBlockchainInfo } from "~/services/chains";
import format from "~/utils/format";
import useStyles from "./styles";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import { Link } from "react-router-dom";

export const loader: LoaderFunction = async () => {
  let shardsInfo: ChainInfo[] = [];
  let beaconInfo: ChainInfo | undefined;
  const { Result, Error } = (await getBlockchainInfo()) as any;
  let totalTxs: number = 0;
  let totalBlocks: number = 0;
  let Epoch: number = 0;
  if (Result !== undefined) {
    Object.keys(Result.BestBlocks).map((key) => {
      // last item is beacon chain
      totalBlocks += Result.BestBlocks[key].Height;
      if (key == "-1") {
        Epoch = Result.BestBlocks[key].Epoch;
        beaconInfo = Result.BestBlocks[key];
        return <></>;
      }
      shardsInfo.push(Result.BestBlocks[key]);
      totalTxs += Result.BestBlocks[key].TotalTxs;
    });

    let overview: any[] = [];
    overview.push({ Title: "Network", Content: Result.ChainName, type: 0 });
    overview.push({
      Title: "Total Shards",
      Content: Result.ActiveShards,
      type: 0,
    });
    overview.push({ Title: "Total Blocks", Content: totalBlocks, type: 0 });
    overview.push({ Title: "Epoch", Content: Epoch, type: 0 });
    overview.push({
      Title: "Total Transactions",
      Content: totalTxs,
      // changePercent?: number,
      currencyFormat: false,
      type: 0,
    });

    let data: any = {
      beaconInfo: beaconInfo,
      shardsInfo: shardsInfo,
      overview: overview,
    };
    return data;
  }
  return null;
};

function ShardsOverview() {
  const { classes } = useStyles();
  const loaded = true;
  const loaderData = useLoaderData();
  const [data, setData] = useState(loaderData);
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    if (loaderData) {
      setData(loaderData);
      setOverviewData(loaderData.overview);
    } else {
      window.location.reload();
    }
  }, [loaderData]);

  const fetcher = useFetcher();

  // Get fresh data every 30 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher.load("/chain?index");
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (fetcher.data) {
      setData(fetcher.data);
      setOverviewData(fetcher.data.overview);
    }
  }, [fetcher.data]);

  function getBlockHashText(hash: String) {
    let result: string = "";
    result = hash.slice(0, 30) + "..." + hash.slice(-12);
    return result;
  }

  const shardRows = data.shardsInfo.map((element: any, idx: number) => {
    return (
      <tr
        key={element.Hash}
        style={{ cursor: "pointer", lineHeight: 0, height: 50 }}
      >
        <td style={{ width: 100 }}>
          <Text
            className={classes.hashText}
            variant="link"
            component={Link}
            to={"/block/" + element.Hash}
          >
            {getBlockHashText(element.Hash)}
          </Text>
        </td>
        <td style={{ color: "#757575", minWidth: 200 }}>
          {format.formatUnixDateTime(element.Time)}
        </td>
        <td className={classes.otherColumn}>{idx}</td>
        <td className={classes.otherColumn}>
          {format.formatAmount({ humanAmount: element.Height, decimals: 4 })}
        </td>
        <td>
          {format.formatAmount({ humanAmount: element.TotalTxs, decimals: 4 })}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Space h={30} />

      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <div>
          <Box style={{ padding: "0 16px" }}>
            <SectionTitle text="Overview" />
            <Space h={6} />
            <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
              <Loader
                color="gray"
                size={30}
                style={{ height: !loaded ? 200 : 0 }}
              />
            </Group>
          </Box>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <ScrollArea
              p={0}
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  display: "block",
                  overflow: "auto",
                  width: "auto",
                  whiteSpace: "nowrap",
                  height: "auto",
                  padding: "0 16px",
                }}
              >
                {overviewData.map((item: any) => (
                  <div
                    key={item.Name}
                    style={{
                      minWidth: 230,
                      display: "inline-block",
                      marginRight: 16,
                      position: "relative",
                    }}
                  >
                    <SummaryCard
                      key={item.Title}
                      title={item.Title}
                      content={item.Content}
                      currencyFormat={false}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Box style={{ padding: "0 16px" }}>
            <Space h={24} />
            <SectionTitle text="Beacon Chain" />
            <Space h={6} />
          </Box>
        </div>
      </MediaQuery>

      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <div>
          <Box style={{ padding: "0 30px" }}>
            <SectionTitle text="Overview" />
            <Space h="md" />
            <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
              <Loader
                color="gray"
                size={30}
                style={{ height: !loaded ? 200 : 0 }}
              />
            </Group>
          </Box>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <Box p={0}>
              <Grid gutter="lg" columns={15}>
                {overviewData.map((item: any) => (
                  <Grid.Col span={3} key={item.Title}>
                    <SummaryCard
                      title={item.Title}
                      content={item.Content}
                      currencyFormat={false}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          </div>


          <Box style={{ padding: "0 30px" }}>
            <Space h={40} />
            <SectionTitle text="Beacon Chain" />
            <Space h="sm" />
          </Box>
        </div>
      </MediaQuery>

      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px 30px" }}>
          <ScrollArea
            style={{
              height: "auto",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #363636",
            }}
          >
            <Table verticalSpacing="sm" horizontalSpacing="md" fontSize={16}>
              <thead className={classes.tableThead}>
                <tr>
                  <th>
                    <Text className={classes.tableTheadText}>Hash</Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}></Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}>Height</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ cursor: "pointer", lineHeight: 0, height: 50 }}>
                  <td style={{ width: 100 }}>
                    <Text
                      className={classes.hashText}
                      variant="link"
                      component={Link}
                      to={"/block/" + data.beaconInfo.Hash + "?beacon=true"}
                    >
                      {getBlockHashText(data.beaconInfo.Hash)}
                    </Text>
                  </td>
                  <td style={{ color: "#757575", minWidth: 200 }}>
                    {format.formatUnixDateTime(data.beaconInfo.Time)}
                  </td>
                  <td>
                    {format.formatAmount({
                      humanAmount: data.beaconInfo.Height,
                      decimals: 4,
                    })}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ScrollArea>
        </Box>
      </MediaQuery>
      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <ScrollArea
          style={{
            height: "auto",
            overflow: "hidden",
            border: "1px solid #363636",
          }}
        >
          <Table verticalSpacing="sm" horizontalSpacing="md" fontSize={16}>
            <thead className={classes.tableThead}>
              <tr>
                <th>
                  <Text className={classes.tableTheadText}>Hash</Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}></Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}>Height</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ cursor: "pointer", lineHeight: 0, height: 50 }}>
                <td style={{ width: 100 }}>
                  <Text
                    className={classes.hashText}
                    variant="link"
                    component={Link}
                    to={"/block/" + data.beaconInfo.Hash + "?beacon=true"}
                  >
                    {getBlockHashText(data.beaconInfo.Hash)}
                  </Text>
                </td>
                <td style={{ color: "#757575", minWidth: 200 }}>
                  {format.formatUnixDateTime(data.beaconInfo.Time)}
                </td>
                <td>
                  {format.formatAmount({
                    humanAmount: data.beaconInfo.Height,
                    decimals: 4,
                  })}
                </td>
              </tr>
            </tbody>
          </Table>
        </ScrollArea>
      </MediaQuery>


      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <div>
          <Space h={40} />
          <Box style={{ padding: "0 30px" }}>
            <SectionTitle text="Most recent blocks" />
          </Box>
        </div>
      </MediaQuery>
      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <div>
          <Space h={24} />
          <Box style={{ padding: "0 16px" }}>
            <SectionTitle text="Most recent blocks" />
          </Box>
        </div>
      </MediaQuery>

      <Space h="sm" />
      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px 30px" }}>
          <ScrollArea
            style={{
              height: "auto",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #363636",
            }}
          >
            <Table verticalSpacing="sm" horizontalSpacing="md" fontSize={16}>
              <thead className={classes.tableThead}>
                <tr>
                  <th>
                    <Text className={classes.tableTheadText}>Hash</Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}></Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}>
                      No. of shards
                    </Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}>Height</Text>
                  </th>
                  <th>
                    <Text className={classes.tableTheadText}>Total txs</Text>
                  </th>
                </tr>
              </thead>
              <tbody>{shardRows}</tbody>
            </Table>
          </ScrollArea>
        </Box>
      </MediaQuery>
      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <ScrollArea
          style={{
            height: "auto",
            overflow: "hidden",
            border: "1px solid #363636",
          }}
        >
          <Table verticalSpacing="sm" horizontalSpacing="md" fontSize={16}>
            <thead className={classes.tableThead}>
              <tr>
                <th>
                  <Text className={classes.tableTheadText}>Hash</Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}></Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}>No. of shards</Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}>Height</Text>
                </th>
                <th>
                  <Text className={classes.tableTheadText}>Total txs</Text>
                </th>
              </tr>
            </thead>
            <tbody>{shardRows}</tbody>
          </Table>
        </ScrollArea>
      </MediaQuery>
      <Space h="md" />
    </>
  );
}

export default ShardsOverview;
