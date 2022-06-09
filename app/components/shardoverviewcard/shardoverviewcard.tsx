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
                <Group position="apart" style={{ borderBottom: '1px solid #404040', padding: '10px 24px' }}>
                    <Text style={{ fontSize: 20, color: '#fff', fontWeight: 500 }}>Shard {chainId}</Text>
                    <ArrowUpRight />
                </Group>
                <Grid columns={9} style={{ padding: '18px 24px' }}>
                    <Grid.Col xs={5}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Height</Text>
                            <Text className={classes.propData}>{chainInfo.Height}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col xs={4}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Total txs</Text>
                            <Text className={classes.propData}>{chainInfo.TotalTxs}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col xs={5}
                        sm={6}
                        md={6}
                        lg={6}
                        xl={6} >
                        <Stack align="flex-start" justify="flex-start" spacing="xs">
                            <Text className={classes.propTitle}>Most recent block</Text>
                            <Text className={classes.propData}>{chainInfo.Hash}</Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col xs={4}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3} >
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
