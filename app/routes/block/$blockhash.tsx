import {
  Paper,
  Grid,
  Text,
  ScrollArea,
  Space,
  Table,
  Box,
  MediaQuery,
} from "@mantine/core";
import { useState } from "react";
import useStyles from "./styles";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlock } from "~/services/chains";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import format from "~/utils/format";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
import { BlockData, TxInBlock } from "~/types/types";
const PrettyPrintJson = (data: any) => (
  <div>
    <pre style={{ wordWrap: "normal", whiteSpace: "pre-wrap" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export const loader: LoaderFunction = async ({ params, request }) => {
  var blockhash: any = params.blockhash;
  const url = new URL(request.url);
  const isbeacon = url.searchParams.get("beacon");
  const { Result, Error } = (await getBlock(
    blockhash,
    isbeacon == null ? false : true
  )) as any;

  console.log(Result);

  return Result;
};

const GenTxRow = (txlist: TxInBlock[]) => {
  const result = txlist?.map((element, idx) => {
    return (
      <tr key={idx} style={{ cursor: "pointer" }}>
        <td>{idx + 1}</td>
        <td>
          <Text variant="link" component={Link} to={"/tx/" + element.Hash}>
            {element.Hash}
          </Text>
        </td>
      </tr>
    );
  });
  return result;
};

function BlockDetail() {
  let location = useLocation();

  const isbeacon = location.search.includes("beacon");
  const { classes } = useStyles();
  const loaderData: BlockData = useLoaderData();
  const [data, setData] = useState(loaderData);

  console.log(data);

  return (
    <>
      <Space h={30} />

      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <SectionTitle text={"Block Details"} />
        </Box>
      </MediaQuery>

      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 16px" }}>
          <SectionTitle text={"Block Details"} />
        </Box>
      </MediaQuery>

      <Space h="xl" />

      <Box style={{ padding: "0 30px" }}>
        <Paper radius="md" p={0} className={classes.container}>
          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Hash</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.Hash}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Block height</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {format.formatAmount({ humanAmount: data.Height, decimals: 4 })}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Version</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.Version}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Confirmations</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.FinalityHeight > 0
                ? data.Height - data.FinalityHeight
                : "not finality yet"}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Timestamp</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {format.formatUnixDateTime(data.Time)}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Round</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.Round}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Epoch</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.Epoch}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Previous block</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.PreviousBlockHash}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Next block</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {data.NextBlockHash}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Block producer</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              <Text
                style={{
                  textOverflow: "ellipsis",
                  display: "block",
                  overflow: "hidden",
                }}
              >
                {data.BlockProducer}
              </Text>
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Propose Time</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              {format.formatUnixDateTime(data.ProposeTime)}
            </Grid.Col>
          </Grid>

          <Grid columns={25} className={classes.wrapper} style={{ height: 'auto' }}>
            <Grid.Col span={5}>
              <Text className={classes.propertyName}>Validation Data</Text>
            </Grid.Col>
            <Grid.Col span={20} className={classes.propertyValue}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <PrettyPrintJson data={JSON.parse(data.ValidationData)} />
              </ScrollArea>
            </Grid.Col>
          </Grid>

          {isbeacon ? (
            <>
              <Grid columns={25} className={classes.wrapper} style={{ height: 'auto' }}>
                <Grid.Col span={5}>
                  <Text className={classes.propertyName}>Root Hashes</Text>
                </Grid.Col>
                <Grid.Col span={20} className={classes.propertyValue}>
                  <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                    <PrettyPrintJson data={data.RootHash} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>
            </>
          ) : (
            <>
              <Grid columns={25} className={classes.wrapper}>
                <Grid.Col span={5}>
                  <Text className={classes.propertyName}>Tx Root</Text>
                </Grid.Col>
                <Grid.Col span={20} className={classes.propertyValue}>
                  {data.TxRoot}
                </Grid.Col>
              </Grid>
            </>
          )}
        </Paper>
        <Space h="md" />
        <Paper radius="md" p={0} className={classes.container}>
          {isbeacon ? (
            <>
              <Grid columns={25} className={classes.wrapper} style={{ height: 'auto' }}>
                <Grid.Col span={5}>
                  <Text className={classes.propertyName}>Instructions</Text>
                </Grid.Col>
                <Grid.Col span={20} className={classes.propertyValue}>
                  <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                    <PrettyPrintJson data={data.Instructions} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>
            </>
          ) : (
            <>
              <Grid columns={25} className={classes.wrapper} style={{ height: 'auto' }}>
                <Grid.Col span={5}>
                  <Text className={classes.propertyName}>Instructions</Text>
                </Grid.Col>
                <Grid.Col span={20} className={classes.propertyValue}>
                  <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                    <PrettyPrintJson data={data.Instruction} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>
            </>
          )}
        </Paper>
      </Box>

      {isbeacon ? (
        <></>
      ) : (
        <>
          <Space h="md" />

          <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
            <Box style={{ padding: "0 30px" }}>
              <SectionTitle text={"Transactions in block"} />
            </Box>
          </MediaQuery>

          <MediaQuery largerThan={1200} styles={{ display: "none" }}>
            <Box style={{ padding: "0 16px" }}>
              <SectionTitle text={"Transactions in block"} />
            </Box>
          </MediaQuery>

          <Space h="md" />

          <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
            <Box style={{ padding: "0 30px 30px" }}>
              <Paper radius={12} withBorder className={classes.container}>
                <Table
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                  fontSize={16}
                >
                  <thead className={classes.tableThead}>
                    <tr>
                      <th>
                        <Text className={classes.tableTheadText}>No.</Text>
                      </th>
                      <th>
                        <Text className={classes.tableTheadText}>Hash</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{GenTxRow(data.Txs)}</tbody>
                </Table>
              </Paper>
            </Box>
          </MediaQuery>

          <MediaQuery largerThan={1440} styles={{ display: "none" }}>
            <Paper radius={0} withBorder className={classes.container}>
              <Table verticalSpacing="sm" horizontalSpacing="md" fontSize={16}>
                <thead className={classes.tableThead}>
                  <tr>
                    <th>
                      <Text className={classes.tableTheadText}>No.</Text>
                    </th>
                    <th>
                      <Text className={classes.tableTheadText}>Hash</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>{GenTxRow(data.Txs)}</tbody>
              </Table>
            </Paper>
          </MediaQuery>
        </>
      )}

      <Space h="md" />
    </>
  );
}

export default BlockDetail;
