import { Title, Space, TextInput, Pagination, Group, Text, Loader, } from '@mantine/core';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx, getShieldTxs } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import ShieldListCard from '~/components/shieldlistcard/shieldlistcard';

function ShieldTxs() {
    const [txListData, setTxListData] = useState<any>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setPage] = useState(1);
    const [loaded, setLoaded] = useState(false);

    const handleFetchData = async (page: number) => {
        setLoaded(false);
        setPage(page);
        const { Result } = (await getShieldTxs(page)) as any;
        console.log("data", Result);
        setTxListData(Result.Data);
        setTotalPage(Math.floor(Result.Paging.Total / Result.Paging.Limit));
        setLoaded(true);
    }
    useEffect(() => {
        handleFetchData(1);
    }, []);

    return <>
        <SectionTitle text="Shielded" />
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
            <ShieldListCard txlist={txListData}></ShieldListCard>
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

export default ShieldTxs;