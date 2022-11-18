import {
  Space,
  TextInput,
  Group,
  Text,
  Loader,
  ScrollArea,
  Box,
  MediaQuery,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { getVerifyTokenList } from "~/services/coinservice";

import SectionTitle from "~/components/sectiontitle/sectiontitle";
import TokenMarketTable from "~/components/tokenmarkettable/tokenmarkettable";
import Pagination from "~/components/pagination/pagination";
import useStyles from "./styles";
import { getMarketToken } from "~/services/token";

function TokenMarketList() {
  const { classes } = useStyles();
  const [tokenListData, setTokenListData] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const handleFetchData = async () => {
    setLoaded(false);
    // getMarketToken()
    const { data } = (await getMarketToken()) as any;
    console.log("data", data);
    data.sort((a: any, b: any) =>
      a.TokenTradingVolumeUSD24H > b.TokenTradingVolumeUSD24H ? -1 : 1
    );
    setTokenListData(data);
    setLoaded(true);
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <Space h={30} />

      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 30px" }}>
          <SectionTitle text="Tokens" />
        </Box>
      </MediaQuery>
      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <Box style={{ padding: "0 16px" }}>
          <SectionTitle text="Tokens" />
        </Box>
      </MediaQuery>
      <Space h="md" />
      <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
        <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
      </Group>
      <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
        <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
          <div>
            <Box style={{ padding: "0 30px" }}>
              <ScrollArea
                style={{
                  height: "auto",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #363636",
                }}
                scrollbarSize={4}
              >
                <TokenMarketTable tokenlist={tokenListData}></TokenMarketTable>
              </ScrollArea>
            </Box>
          </div>
        </MediaQuery>

        <MediaQuery largerThan={1440} styles={{ display: "none" }}>
          <div>
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
                <TokenMarketTable tokenlist={tokenListData}></TokenMarketTable>
              </Box>
            </ScrollArea>
          </div>
        </MediaQuery>
      </div>

      <Space h={30} />
    </>
  );
}

export default TokenMarketList;
