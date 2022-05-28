import { Title, Space, TextInput, Pagination, Group, Text, Loader, ScrollArea, Center } from '@mantine/core';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import useStyles from './styles'

function Txs() {
    const { classes } = useStyles();
    const [txListData, setTxListData] = useState<any>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);

    const handleFetchData = async (page: number) => {
        setLoaded(false);
        setPage(page);
        const { Result } = (await getNormalTx(page)) as any;
        console.log("data", Result);
        setTxListData(Result.Data);
        setTotalPage(Math.floor(Result.Paging.Total / Result.Paging.Limit));
        setLoaded(true);
    }
    useEffect(() => {
        handleFetchData(1);
    }, []);

    return <>
        <Space h={30} />
        <SectionTitle text="Transactions" />
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
            <ScrollArea style={{ height: 'auto', borderRadius: 12, overflow: 'hidden', border: '1px solid #363636' }} >
                <TxListCard txlist={txListData}></TxListCard>
            </ScrollArea>
        </div>
        <Space h="md" />
        <Group position="center" spacing="lg">
            <Group position="center" spacing="sm">
                <Text size="sm">Go to</Text>
                <TextInput
                    placeholder="Page"
                    type="number"
                    radius='lg'

                    styles={{
                        wrapper: {
                            width: 80,
                            height: 32,
                            textAlign: 'center',
                        },
                        input: {
                            backgroundColor: '#303030',
                            textAlign: 'center',
                            height: 32,
                            lineHeight: 32,
                            minHeight: 32,
                            padding: '0 4px'
                        }
                    }}
                />
            </Group>
            <Pagination page={activePage} onChange={handleFetchData} siblings={1} boundaries={1} total={totalPage} radius="xl" className={classes.paginationBox} classNames={classes} />
        </Group>
        <Space h="sm" />


    </>
}

export default Txs;