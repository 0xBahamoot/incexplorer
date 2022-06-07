import {
  Title,
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
import TxListCard from "~/components/txlistcard/txlistcard";
import { useState, useEffect } from "react";
import { getNormalTx } from "~/services/transactions";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
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
    const { Result } = (await getNormalTx(page)) as any;
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
              }} scrollbarSize={4}
            >
              <TxListCard txlist={txListData}></TxListCard>
            </ScrollArea>
          </div>
        </Box>
      </MediaQuery>

      <MediaQuery largerThan={1440} styles={{ display: "none" }}>
        <Box style={{ padding: "0" }}>
          <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
            <ScrollArea
              style={{
                height: "auto",
                borderRadius: 0,
                overflow: "hidden",
                border: "1px solid #363636",
              }} scrollbarSize={4}
            >
              <TxListCard txlist={txListData}></TxListCard>
            </ScrollArea>
          </div>
        </Box>
      </MediaQuery>
      <Space h="md" />

      <Box style={{ padding: "0 30px" }}>
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
            // siblings={1}
            boundaries={1}
            size="sm"
            total={totalPage}
            radius="xl"
            className={classes.paginationBox}
            classNames={classes}
            noWrap={true}
          />
        </Group>
      </Box>
    </>
  );
}

export default Txs;
