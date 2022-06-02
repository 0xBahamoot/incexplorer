import { Paper, ScrollArea, Text, Table, Space } from '@mantine/core';
import { getMempoolInfo } from '~/services/chains';
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import useStyles from './styles'
import format from '~/utils/format';

import { Link } from 'react-router-dom';


import { useState, useEffect } from 'react';
export const loader: LoaderFunction = async () => {
    let txList: any[];
    const { Result, Error } = (await getMempoolInfo()) as any;
    txList = Result;
    console.log(Result);
    return txList
};
function PendingTxs() {

    const loaderData = useLoaderData();
    const [data, setData] = useState(loaderData);

    useEffect(() => {
        setData(loaderData)
    }, [loaderData]);

    const fetcher = useFetcher();

    // Get fresh data every 15 seconds.
    useEffect(() => {
        const interval = setInterval(() => {
            fetcher.load("/pendingtxs?index");
        }, 15 * 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            setData(fetcher.data);
        }
    }, [fetcher.data]);


    const { classes } = useStyles();
    const rows = data.ListTxs?.map((element: any, idx: number) => {
        if (idx >= 15) {
            return null
        }

        return (

            <tr key={element.TxID} style={{ cursor: 'pointer', height: 50 }} >
                <td>{format.formatUnixDateTime(element.LockTime)}</td>
                <td style={{ lineHeight: '14px' }}><Text className={classes.txhash} variant="link" component={Link} to={"/tx/" + element.TxID}>{element.TxID}</Text></td>
            </tr>
        )
    });

    return (
        <>
            <Space h={30} />
            <SectionTitle text="Pending transactions" />
            <Space h="md" />
            <Paper radius={12} withBorder className={classes.container}>
                <ScrollArea style={{ height: 'auto', borderRadius: 12, overflow: 'hidden', border: '1px solid #363636' }} >
                    <Table verticalSpacing={7.5} horizontalSpacing="md">
                        <thead className={classes.tableThead}>
                            <tr>
                                <th>Time created</th>
                                <th>Hash</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </>

    );
}

export default PendingTxs;