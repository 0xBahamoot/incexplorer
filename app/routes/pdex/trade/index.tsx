import {
    Space,
    TextInput,
    Pagination,
    Group,
    Text,
    Loader,
    ScrollArea,
    Box,
    MediaQuery,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { getTradeTxs } from "~/services/transactions";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import TradeListCard from "~/components/tradelistcard/tradelistcard";
import useStyles from "./styles";

function TradeTxs() {
    const { classes } = useStyles();
    const [txListData, setTxListData] = useState<any>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setPage] = useState(1);
    const [gotoPage, setGotoPage] = useState("");
    const [loaded, setLoaded] = useState(false);

    const handleFetchData = async (page: number) => {
        setLoaded(false);
        setPage(page);
        const { Result } = (await getTradeTxs(page)) as any;
        console.log("data", Result);
        setTxListData(Result.Data);
        setTotalPage(Math.floor(Result.Paging.Total / Result.Paging.Limit));
        setLoaded(true);
    };
    useEffect(() => {
        handleFetchData(1);
    }, []);

    function getPage(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && gotoPage !== "") {
            handleFetchData(parseInt(gotoPage));
        }
    }
    return (
        <>
            <Space h={30} />

            <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
                <Box style={{ padding: "0 30px" }}>
                    <SectionTitle text="Trade" />
                </Box>
            </MediaQuery>
            <MediaQuery largerThan={1200} styles={{ display: "none" }}>
                <Box style={{ padding: "0 16px" }}>
                    <SectionTitle text="Trade" />
                </Box>
            </MediaQuery>
            <Space h="md" />
            <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
                <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
            </Group>
            <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
                <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
                    <Box style={{ padding: "0 30px 30px" }}>
                        <ScrollArea
                            style={{
                                height: "auto",
                                borderRadius: 12,
                                overflow: "hidden",
                                border: "1px solid #363636",
                            }}
                            scrollbarSize={4}
                        >
                            <TradeListCard txlist={txListData}></TradeListCard>
                        </ScrollArea>
                    </Box>
                </MediaQuery>

                <MediaQuery largerThan={1440} styles={{ display: "none" }}>
                    <ScrollArea
                        style={{
                            height: "auto",
                            overflow: "hidden",
                            paddingBottom: 16,
                        }}
                        scrollbarSize={4}
                    >
                        <Box
                            style={{
                                height: "auto",
                                overflow: "hidden",
                                border: "1px solid #363636",
                            }}
                        >
                            <TradeListCard txlist={txListData}></TradeListCard>
                        </Box>
                    </ScrollArea>
                </MediaQuery>
            </div>

            <Space h="md" />
            <Group position="center" spacing="lg">
                <Group position="center" spacing="sm">
                    <Text size="sm">Go to</Text>
                    <TextInput
                        placeholder="Page"
                        type="number"
                        radius="lg"
                        onChange={(event) => setGotoPage(event.target.value)}
                        onKeyUp={(event) => getPage(event)}
                        styles={{
                            wrapper: {
                                width: 80,
                                height: 32,
                                textAlign: "center",
                            },
                            input: {
                                backgroundColor: "#303030",
                                textAlign: "center",
                                height: 32,
                                lineHeight: 32,
                                minHeight: 32,
                                padding: "0 4px",
                            },
                        }}
                    />
                </Group>
                <Pagination
                    page={activePage}
                    onChange={handleFetchData}
                    siblings={1}
                    boundaries={1}
                    total={totalPage}
                    radius="xl"
                    className={classes.paginationBox}
                    classNames={classes}
                />
            </Group>
            <Space h="sm" />
        </>
    );
}

export default TradeTxs;
