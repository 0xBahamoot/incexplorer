import { Text, Group, Space, Loader, Box, Grid, Paper, Card, Table } from '@mantine/core';
import SummaryCard from '~/components/summarycard/summarycard';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { ChainInfo } from '~/types/types';
import { useState, useEffect } from 'react';
import { getBlockchainInfo } from '~/services/chains';
import format from '~/utils/format';
import useStyles from './styles'
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import { Link } from 'react-router-dom';


export const loader: LoaderFunction = async () => {
    let shardsInfo: ChainInfo[] = []
    let beaconInfo: ChainInfo | undefined
    const { Result, Error } = (await getBlockchainInfo()) as any;
    let totalTxs: number = 0;
    let totalBlocks: number = 0;
    let Epoch: number = 0;
    Object.keys(Result.BestBlocks).map(key => {
        // last item is beacon chain
        totalBlocks += Result.BestBlocks[key].Height;
        if (key == "-1") {
            Epoch = Result.BestBlocks[key].Epoch;
            beaconInfo = Result.BestBlocks[key];
            return <></>;
        }
        shardsInfo.push(Result.BestBlocks[key]);
        totalTxs += Result.BestBlocks[key].TotalTxs;
    })
    console.log(Result);

    let overview: any[] = [];
    overview.push({ Title: "Network", Content: Result.ChainName, type: 0 });
    overview.push({ Title: "Total Shards", Content: Result.ActiveShards, type: 0 });
    overview.push({ Title: "Total Blocks", Content: totalBlocks, type: 0 })
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
    }
    return data
};

function ShardsOverview() {

    const { classes } = useStyles();
    const loaded = true;
    const loaderData = useLoaderData();
    const [data, setData] = useState(loaderData);
    const [overviewData, setOverviewData] = useState([]);


    useEffect(() => {
        setData(loaderData)
        setOverviewData(loaderData.overview)
    }, [loaderData]);

    const fetcher = useFetcher();

    // Get fresh data every 15 seconds.
    useEffect(() => {
        const interval = setInterval(() => {
            fetcher.load("/chain?index");
        }, 15 * 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            setData(fetcher.data);
            setOverviewData(fetcher.data.overview)
        }
    }, [fetcher.data]);



    const shardRows = data.shardsInfo.map((element: any, idx: number) => {

        return (
            <tr key={element.Hash} style={{ cursor: 'pointer' }}>
                <td><Text variant="link" component={Link} to={"/block/" + element.Hash}>{element.Hash}</Text></td>
                <td>{format.formatUnixDateTime(element.Time)}</td>
                <td>{idx}</td>
                <td>{format.formatAmount({ humanAmount: element.Height, decimals: 4 })}</td>
                <td>{format.formatAmount({ humanAmount: element.TotalTxs, decimals: 4 })}</td>
            </tr>
        )
    });

    return (
        <>
            <Space h={30} />
            <SectionTitle text="Overview" />
            <Space h='md' />
            <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
                <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
            </Group>

            <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
                <Box p={0}>
                    <Grid gutter="lg" columns={15}>
                        {overviewData.map((item: any) => (
                            <Grid.Col span={3} key={item.Title}>
                                <SummaryCard title={item.Title} content={item.Content} type={0} currencyFormat={false} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Box>
            </div>
            <Space h={40} />
            <SectionTitle text="Beacon Chain" />
            <Space h="sm" />
            <Paper radius={12} withBorder className={classes.container}>
                <Card className={classes.container} radius={12} >
                    <Card.Section>
                        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
                            <thead className={classes.tableThead}>
                                <tr>
                                    <th><Text className={classes.tableTheadText}>Hash</Text></th>
                                    <th><Text className={classes.tableTheadText}>Time created</Text></th>
                                    <th><Text className={classes.tableTheadText}>Height</Text></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ cursor: 'pointer' }}>
                                    <td><Text variant="link" component={Link} to={"/block/" + data.beaconInfo.Hash + '?beacon=true'}>{data.beaconInfo.Hash}</Text></td>
                                    <td>{format.formatUnixDateTime(data.beaconInfo.Time)}</td>
                                    <td>{format.formatAmount({ humanAmount: data.beaconInfo.Height, decimals: 4 })}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Paper>
            <Space h={40} />

            <SectionTitle text="Most recent blocks" />
            <Space h="sm" />
            <Paper radius={12} withBorder className={classes.container}>
                <Card className={classes.container} radius={12} >
                    <Card.Section>
                        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
                            <thead className={classes.tableThead}>
                                <tr>
                                    <th><Text className={classes.tableTheadText}>Hash</Text></th>
                                    <th><Text className={classes.tableTheadText}>Time created</Text></th>
                                    <th><Text className={classes.tableTheadText}>No. of shards</Text></th>
                                    <th><Text className={classes.tableTheadText}>Height</Text></th>
                                    <th><Text className={classes.tableTheadText}>Total txs</Text></th>
                                </tr>
                            </thead>
                            <tbody>{shardRows}</tbody>
                        </Table>
                    </Card.Section>
                </Card>
            </Paper>
        </>

    );
}

export default ShardsOverview;