import { Paper, Grid, Text, Space, ScrollArea, Box } from '@mantine/core';
import { useState } from 'react';
import type { LoaderFunction } from "@remix-run/node";
import { TxDetail } from '~/types/types';
import { useLoaderData } from "@remix-run/react";
import { getDetailTx } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import useStyles from './styles'
import format from '~/utils/format';

import { Link } from 'react-router-dom';
const PrettyPrintJson = (data: any) => (<div><pre style={{ wordWrap: "normal", whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre></div>);

export const loader: LoaderFunction = async ({ params }) => {
  let txdetail: TxDetail;
  var txhash: any = params.txhash;
  const { Result, Error } = (await getDetailTx(txhash)) as any;
  console.log(Result);
  txdetail = Result;
  return txdetail
};


function Tx() {
  const loaderData: TxDetail = useLoaderData();
  const { classes } = useStyles();

  return (
    <>
      <Space h={30} />
      <Box style={{ padding: '0 30px' }}>
        <SectionTitle text={"Transaction Details"} />
        <Space h="md" />

        <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>
          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Status</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.IsInBlock ? "Success" : "Pending"}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">TxHash</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.Hash}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">ShardID</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.ShardID}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Block</Text>
            </Grid.Col>
            <Grid.Col span={20}><Text variant="link" component={Link} to={"/block/" + loaderData.BlockHash}>{loaderData.BlockHash}</Text></Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Block height</Text>
            </Grid.Col>
            <Grid.Col span={20}>{format.formatAmount({ humanAmount: loaderData.BlockHeight, decimals: 4 })}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Network Fee</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.Fee} PRV</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Version</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.Version}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Timestamp</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.LockTime}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Type</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.TransactionData.meta_type_name}</Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Memo</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.Info}</Grid.Col>
          </Grid>

        </Paper>

        <Space h="md" />

        <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Metadata</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <PrettyPrintJson data={(loaderData.Metadata != '') ? JSON.parse(loaderData.Metadata) : null}></PrettyPrintJson>
              </ScrollArea>
            </Grid.Col>
          </Grid>
        </Paper>
        <Space h="md" />

        <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">SigPubkey</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              {loaderData.SigPubKey}
            </Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Sig</Text>
            </Grid.Col>
            <Grid.Col span={20}>{loaderData.Sig}</Grid.Col>
          </Grid>


          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Proof (base58check encode)</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <Text>{loaderData.Proof}</Text>
              </ScrollArea>
            </Grid.Col>
          </Grid>


          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Proof detail</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <PrettyPrintJson data={loaderData.ProofDetail}></PrettyPrintJson>
              </ScrollArea>
            </Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Transacted privacy coin</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <PrettyPrintJson data={(loaderData.PrivacyCustomTokenData != '') ? JSON.parse(loaderData.PrivacyCustomTokenData) : ''} ></PrettyPrintJson>
              </ScrollArea>
            </Grid.Col>
          </Grid>

          <Grid columns={24} className={classes.wrapper}>
            <Grid.Col span={4}>
              <Text color="gray">Privacy coin proof detail</Text>
            </Grid.Col>
            <Grid.Col span={20}>
              <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
                <PrettyPrintJson data={loaderData.PrivacyCustomTokenProofDetail}></PrettyPrintJson>
              </ScrollArea>
            </Grid.Col>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default Tx;