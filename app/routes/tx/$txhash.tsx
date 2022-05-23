import { Paper, Grid, Text, createStyles, Space } from '@mantine/core';
import { useState } from 'react';
import type { LoaderFunction } from "@remix-run/node";
import { TxDetail } from '~/types/types';
import { useLoaderData } from "@remix-run/react";
import { getDetailTx } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import useStyles from './styles'


export const loader: LoaderFunction = async ({ params }) => {
  let txdetail: TxDetail[];
  var txhash: any = params.txhash;
  const { Result, Error } = (await getDetailTx(txhash)) as any;
  txdetail = Result;
  return txdetail
};


function Tx() {
  const loaderData = useLoaderData();
  const { classes } = useStyles();

  return (
    <>
      <SectionTitle text={"Transaction " + loaderData.Hash} />
      <Space h="md" />
      <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.container}>
        <Grid columns={24} className={classes.wrapper}>
          {/* Common block info*/}
          <Grid.Col span={4}>
            <Text color="gray">Block height</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Version</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Confirmations</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Timestamp</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Round</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Epoch</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Previous block</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Next block</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Block producer</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Validation data</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Block producer signature</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Aggregated signature	</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>
        {/* Beacon block info*/}

        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Instructions</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>
        {/* Shard block info*/}
        <Grid columns={24} className={classes.wrapper}>
          <Grid.Col span={4}>
            <Text color="gray">Merkle TxS root</Text>
          </Grid.Col>
          <Grid.Col span={20}>1</Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}

export default Tx;