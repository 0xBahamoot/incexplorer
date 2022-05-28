import { Title, Space, TextInput, Pagination, Group, Text, Loader, ScrollArea } from '@mantine/core';
import TxListCard from '~/components/txlistcard/txlistcard';
import { useState, useEffect } from 'react';
import { getNormalTx, getShieldTxs } from '~/services/transactions';
import SectionTitle from '~/components/sectiontitle/sectiontitle';
import ShieldListCard from '~/components/shieldlistcard/shieldlistcard';
import useStyles from './styles'

function ShieldTxs() {
    const { classes } = useStyles();
    const [txListData, setTxListData] = useState<any>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setPage] = useState(1);
    const [gotoPage, setGotoPage] = useState("");
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

    function getPage(event: React.KeyboardEvent<HTMLInputElement>) {
        if ((event.key === "Enter") && (gotoPage !== "")) {
            handleFetchData(parseInt(gotoPage));
        }
    }
    return <>
        <Space h={30} />
        <SectionTitle text="Shielded" />
        <Space h="md" />
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
            <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>
        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
            <ScrollArea style={{ height: 'auto', borderRadius: 12, overflow: 'hidden', border: '1px solid #363636' }} >
                <ShieldListCard txlist={txListData}></ShieldListCard>
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
                    onChange={(event) => setGotoPage(event.target.value)}
                    onKeyUp={(event) => getPage(event)}

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

export default ShieldTxs;