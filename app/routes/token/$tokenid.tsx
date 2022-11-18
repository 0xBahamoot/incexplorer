import {
  Paper,
  Grid,
  Text,
  Space,
  ScrollArea,
  Box,
  MediaQuery,
  Badge,
  Avatar,
  Center,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { TokenInfo } from "~/types/types";
import { useLoaderData, useNavigate } from "@remix-run/react";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import useStyles from "./styles";
// import { getTokenInfo } from "~/services/coinservice";
import { CircleCheck } from "tabler-icons-react";
import { getTokenIcon } from "~/services/icons";
import { currencyTypeToNetworkName } from "~/utils/currencytype";
import { getTokenInfoNew } from "~/services/token";
import format from "~/utils/format";

export const loader: LoaderFunction = async ({ params }) => {
  let tokenInfo: TokenInfo;
  var tokenid: any = params.tokenid;
  try {
    const { data, message } = (await getTokenInfoNew(tokenid)) as any;
    console.log("message", message);
    tokenInfo = data;
    return tokenInfo;
  } catch (error: any) {
    console.log("message", error);
    return null;
  }
};

function renderTokenDetailContent(
  loaderData: TokenInfo,
  classes: any,
  padding: string
) {
  const customNetworkName = currencyTypeToNetworkName(loaderData.CurrencyType);
  return (
    <>
      <Paper
        radius={padding == "0px 16px" ? 0 : "md"}
        p={0}
        className={classes.container}
        style={{ borderWidth: padding == "0px 16px" ? "1px 0px" : "1px" }}
      >
        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>TokenID</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.TokenID}
          </Grid.Col>
        </Grid>
        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Name</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Name}
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper} style={{ height: 60 }}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Logo</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            <Avatar
              size={32}
              src={getTokenIcon(loaderData.PSymbol)}
              style={{ zIndex: 1, borderRadius: "100%" }}
            />
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Symbol</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.PSymbol.replace("p", "").toUpperCase()}
          </Grid.Col>
        </Grid>
        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>pSymbol</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.PSymbol}
          </Grid.Col>
        </Grid>
        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Decimals</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Decimals}
          </Grid.Col>
        </Grid>
        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>pDecimals</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.PDecimals}
          </Grid.Col>
        </Grid>
        {loaderData.ContractID === "" ? null : loaderData.Network ===
          "Unified" ? (
          loaderData.ListUnifiedToken.map((element, idx) => {
            const networkName = currencyTypeToNetworkName(element.CurrencyType);
            const words = networkName.split(" ");

            for (let i = 0; i < words.length; i++) {
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
            return (
              <Grid
                columns={25}
                className={classes.wrapper}
                key={element.TokenID}
              >
                <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
                  <Text className={classes.propertyName}>{words} ID</Text>
                </Grid.Col>
                <Grid.Col
                  xs={20}
                  sm={23}
                  md={23}
                  lg={20}
                  xl={20}
                  className={classes.propertyValue}
                >
                  {element.ContractID}
                </Grid.Col>
              </Grid>
            );
          })
        ) : (
          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
              <Text className={classes.propertyName}>ContractID</Text>
            </Grid.Col>
            <Grid.Col
              xs={20}
              sm={23}
              md={23}
              lg={20}
              xl={20}
              className={classes.propertyValue}
            >
              {loaderData.ContractID ===
              "0x0000000000000000000000000000000000000000"
                ? "native token"
                : loaderData.ContractID}
            </Grid.Col>
          </Grid>
        )}

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Network</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Network === ""
              ? "Incognito"
              : loaderData.Network === "Unified"
              ? "Incognito (Unified)"
              : customNetworkName[0].toUpperCase() +
                customNetworkName.substring(1)}
          </Grid.Col>
        </Grid>
        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Price (USD)</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {Math.round((loaderData.PriceUsd + Number.EPSILON) * 100) / 100}
          </Grid.Col>
        </Grid>
        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>24h Volume (USD)</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {format.formatAmount({
              humanAmount: loaderData.TokenTradingVolumeUSD24H,
              decimals: 2,
            })}
          </Grid.Col>
        </Grid>
        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Total volume (USD)</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {format.formatAmount({
              humanAmount: loaderData.TokenTradingVolumeUSDTotal,
              decimals: 2,
            })}
          </Grid.Col>
        </Grid>
      </Paper>

      <Space h="md" />
    </>
  );
}

function renderTokenInfo(loaderData: TokenInfo, classes: any, padding: string) {
  return (
    <>
      <Box style={{ padding: padding }}>
        <SectionTitle text={"Token Info"} />
        <Badge
          color="green"
          variant="filled"
          style={{
            textTransform: "none",
            fontSize: 10,
            fontWeight: 500,
            marginTop: 5,
          }}
          p={6}
          leftSection={
            <CircleCheck
              size={14}
              strokeWidth={2}
              color={"white"}
              style={{ marginTop: 5 }}
            />
          }
          hidden={!loaderData.Verified}
        >
          Verified
        </Badge>
        <Space h="md" />
      </Box>
      {padding === "0px 16px" ? (
        <ScrollArea
          style={{
            height: "auto",
            width: "100vw",
            overflow: "hidden",
            paddingBottom: 16,
          }}
          scrollbarSize={4}
        >
          {renderTokenDetailContent(loaderData, classes, padding)}
        </ScrollArea>
      ) : (
        <Box style={{ padding: padding }}>
          {renderTokenDetailContent(loaderData, classes, padding)}
        </Box>
      )}
    </>
  );
}

function TokenInfoPage() {
  const loaderData: TokenInfo = useLoaderData();
  const { classes } = useStyles();
  let navigate = useNavigate();
  console.log(loaderData);
  if (loaderData) {
    return (
      <>
        <Space h={30} />

        <MediaQuery largerThan={1440} styles={{ display: "none" }}>
          <div>{renderTokenInfo(loaderData, classes, "0px 16px")}</div>
        </MediaQuery>

        <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
          <div>{renderTokenInfo(loaderData, classes, "0px 30px")}</div>
        </MediaQuery>

        <Space h="md" />
      </>
    );
  } else {
    return (
      <>
        <Center style={{ width: "100%", height: "calc(100vh - 150px)" }}>
          <Box>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 20,
                display: "block",
                color: "#999",
              }}
            >
              Oh no! Token not found
            </Text>
          </Box>
        </Center>
      </>
    );
  }
}

export default TokenInfoPage;
