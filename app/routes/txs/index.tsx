import { Title, Space, TextInput, Pagination, Group, Text, Loader, } from '@mantine/core';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';

function Txs() {
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
        setTotalPage(Result.Paging.Total);
        setLoaded(true);
    }
    useEffect(() => {
        handleFetchData(1);
    }, []);

    return <>
        <SectionTitle text="Transactions" />
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
            <TxListCard txlist={txListData}></TxListCard>
        </div>
        <Space h="md" />
        <Group position="center" spacing="lg">
            <Group position="center">
                <Text size="sm">Go to</Text>
                <TextInput
                    placeholder="Page"
                    type="number"
                    radius='lg'
                    style={{
                        width: 80
                    }}
                />
            </Group>
            <Pagination page={activePage} onChange={handleFetchData} siblings={1} boundaries={1} total={totalPage} radius="xl" />
        </Group>
        <Space h="sm" />


    </>
}

export default Txs;