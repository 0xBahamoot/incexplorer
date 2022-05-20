import { Paper, Text, Group, ActionIcon, Box, Grid, Stack } from '@mantine/core';
import React, { FunctionComponent } from 'react'
import useStyles from './styles'
import { ChainInfo } from '~/types/types';
import moment from 'moment';
import { ArrowUpRight } from 'tabler-icons-react';

type Props = {
    chainId: number
    chainInfo: ChainInfo
}

const ShardOverviewCard: FunctionComponent<Props> = ({ chainInfo, chainId }) => {
    const { classes } = useStyles();
    return (
        <>
            <Paper radius={12} withBorder className={classes.paper}>
                <Group position="apart" style={{ borderBottom: '1px solid #404040', padding: '10px 20px' }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Shard {chainId}</Text>
                    <ActionIcon size="lg" radius="xl">
                        <ArrowUpRight />
                    </ActionIcon>
                </Group>
                <Grid gutter="lg" columns={6} style={{ padding: '10px 20px' }}>
                    <Grid.Col span={4} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Height</Text>
                            <Text className={classes.propData}>{chainInfo.Height}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={2} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Total txs</Text>
                            <Text className={classes.propData}>{chainInfo.TotalTxs}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={4} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Most recent block</Text>
                            <Text className={classes.propData}>{chainInfo.Hash}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={2} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Time</Text>
                            <Text className={classes.propData}>{moment.unix(chainInfo.Time).fromNow()}</Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>
        </>

    );
}

export default ShardOverviewCard;
