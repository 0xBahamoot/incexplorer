import { Paper, Grid, Text, ScrollArea, Space, Table } from '@mantine/core';
import { useState } from 'react';
import useStyles from './styles'
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBlock } from '~/services/chains';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import format from '~/utils/format';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { BlockData, TxInBlock } from '~/types/types';
const PrettyPrintJson = (data: any) => (<div><pre style={{ wordWrap: "normal", whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre></div>);

export const loader: LoaderFunction = async ({ params, request }) => {
  var blockhash: any = params.blockhash;
  const url = new URL(request.url);
  const isbeacon = url.searchParams.get("beacon");
  const { Result, Error } = (await getBlock(blockhash, (isbeacon == null) ? false : true)) as any;

  console.log(Result);

  return Result
};

const GenTxRow = (txlist: TxInBlock[]) => {
  const result = txlist?.map((element, idx) => {
    return (
      <tr key={idx} style={{ cursor: 'pointer' }} >
        <td>{idx + 1}</td>
        <td><Text variant="link" component={Link} to={"/tx/" + element.Hash}>{element.Hash}</Text></td>
      </tr>
    )
  });
  return result
}


function BlockDetail() {
  let location = useLocation();

  const isbeacon = location.search.includes("beacon");
  const { classes } = useStyles();
  const loaderData: BlockData = useLoaderData();
  const [data, setData] = useState(loaderData);

  console.log(data);

  return (
    <>
      <Space h={40} />
      <SectionTitle text={"Block Details"} />
      <Space h="xl" />
      <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>
        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Hash</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.Hash}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Block height</Text>
          </Grid.Col>
          <Grid.Col span={20}>{format.formatAmount({ humanAmount: data.Height, decimals: 4 })}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Version</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.Version}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Confirmations</Text>
          </Grid.Col>
          <Grid.Col span={20}>{(data.FinalityHeight > 0) ? data.Height - data.FinalityHeight : 'not finality yet'}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Timestamp</Text>
          </Grid.Col>
          <Grid.Col span={20}>{format.formatUnixDateTime(data.Time)}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Round</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.Round}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Epoch</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.Epoch}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Previous block</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.PreviousBlockHash}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Next block</Text>
          </Grid.Col>
          <Grid.Col span={20}>{data.NextBlockHash}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Block producer</Text>
          </Grid.Col>
          <Grid.Col span={20}><Text style={{ textOverflow: 'ellipsis', display: 'block', overflow: 'hidden' }}>{data.BlockProducer}</Text></Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Propose Time</Text>
          </Grid.Col>
          <Grid.Col span={20}>{format.formatUnixDateTime(data.ProposeTime)}</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Validation Data</Text>
          </Grid.Col>
          <Grid.Col span={20}>
            <ScrollArea style={{ height: 250 }}>
              <PrettyPrintJson data={JSON.parse(data.ValidationData)} />
            </ScrollArea>
          </Grid.Col>
        </Grid>

        {
          (isbeacon) ?
            <>
              <Grid columns={24} className={classes.wrapper}>
                <Grid.Col span={4}>
                  <Text color="gray">Root Hashes</Text>
                </Grid.Col>
                <Grid.Col span={20}>
                  <ScrollArea style={{ height: 250 }}>
                    <PrettyPrintJson data={data.RootHash} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>

            </>
            :
            <>
              <Grid columns={24} className={classes.wrapper}>
                <Grid.Col span={4}>
                  <Text color="gray">Tx Root</Text>
                </Grid.Col>
                <Grid.Col span={20}>{data.TxRoot}</Grid.Col>
              </Grid>
            </>
        }

      </Paper>
      <Space h="md" />
      <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>

        {
          (isbeacon) ?
            <>
              <Grid columns={24} className={classes.wrapper}>
                <Grid.Col span={4}>
                  <Text color="gray">Instructions</Text>
                </Grid.Col>
                <Grid.Col span={20}>
                  <ScrollArea style={{ height: 250 }}>
                    <PrettyPrintJson data={data.Instructions} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>
            </>
            :
            <>
              <Grid columns={24} className={classes.wrapper}>
                <Grid.Col span={4}>
                  <Text color="gray">Instructions</Text>
                </Grid.Col>
                <Grid.Col span={20}>
                  <ScrollArea style={{ height: 250 }}>
                    <PrettyPrintJson data={data.Instruction} />
                  </ScrollArea>
                </Grid.Col>
              </Grid>

            </>
        }
      </Paper>
      {
        (isbeacon) ?
          <></> :
          <>
            <Space h="md" />
            <SectionTitle text={"Transactions in block"} />
            <Space h="xl" />

            <Paper radius={12} withBorder className={classes.container}>
              <Table verticalSpacing="sm" horizontalSpacing="md">
                <thead className={classes.tableThead}>
                  <tr>
                    <th><Text className={classes.tableTheadText}>No.</Text></th>
                    <th><Text className={classes.tableTheadText}>Hash</Text></th>
                  </tr>
                </thead>
                <tbody>{GenTxRow(data.Txs)}</tbody>
              </Table>
            </Paper>
          </>}

    </>
  );
}

export default BlockDetail;