import {
  Space,
  TextInput,
  Group,
  Text,
  Grid,
  Loader,
  ScrollArea,
  Box,
  MediaQuery,
} from "@mantine/core";
import TxListCard from "~/components/txlistcard/txlistcard";
import { useState, useEffect } from "react";
import { getNormalTx, getTxsFromCsv } from "~/services/transactions";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import Pagination from "~/components/pagination/pagination";
import useStyles from "./styles";

function Txs() {
  const { classes } = useStyles();
  const [txListData, setTxListData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [gotoPage, setGotoPage] = useState("");
  const [activePage, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const handleFetchData = async (page: number) => {
    setLoaded(false);
    setPage(page);
    // const { Result } = (await getNormalTx(page)) as any;
    // console.log("data", Result);
    // setTxListData(Result.Data);
    // setTotalPage(Math.floor(Result.Paging.Total / Result.Paging.Limit));
    let txList: any[] = [];

    const result = (await getTxsFromCsv(-1, 100)) as any;
    console.log("result", result.Result);
    result.Result.map((item: any) => {
      txList.push(item.TxDetail);
    });
    setTxListData(txList);
    setLoaded(true);
  };
  useEffect(() => {
    handleFetchData(1);
  }, []);

  const handlePageClick = (event: any) => {
    handleFetchData(event.selected);
  };

  function getPage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && gotoPage !== "") {
      handleFetchData(parseInt(gotoPage));
    }
  }

  return (
    <>
      <Space h={30} />

      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <SectionTitle text="Transactions" />
        </Box>
      </MediaQuery>
      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 16px" }}>
          <SectionTitle text="Transactions" />
        </Box>
      </MediaQuery>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>

      <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #363636",
              }}
              scrollbarSize={4}
            >
              <TxListCard txlist={txListData}></TxListCard>
            </ScrollArea>
            <Box style={{ padding: "0 16px" }}>
              <Group position="center">
                <Group position="center" spacing="xs">
                  <Text size="sm" color={"#fff"}>
                    Go to
                  </Text>
                  <TextInput
                    placeholder="Page"
                    type="number"
                    radius="lg"
                    onChange={(event) => setGotoPage(event.target.value)}
                    onKeyUp={(event) => getPage(event)}
                    styles={{
                      wrapper: {
                        width: 60,
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
                  totalPage={totalPage}
                  currentPage={activePage}
                  onPageChange={handlePageClick}
                ></Pagination>
              </Group>
            </Box>
          </div>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0" }}>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
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
                <TxListCard txlist={txListData}></TxListCard>
              </Box>
            </ScrollArea>
          </div>
          <Box style={{ padding: "0 16px" }}>
            <Group position="left">
              <Group position="left" spacing="xs">
                <Text size="sm" color={"#fff"}>
                  Go to
                </Text>
                <TextInput
                  placeholder="Page"
                  type="number"
                  radius="lg"
                  onChange={(event) => setGotoPage(event.target.value)}
                  onKeyUp={(event) => getPage(event)}
                  styles={{
                    wrapper: {
                      width: 60,
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
                totalPage={totalPage}
                currentPage={activePage}
                onPageChange={handlePageClick}
              ></Pagination>
            </Group>
          </Box>
        </Box>
      </MediaQuery>
    </>
  );
}

export default Txs;
