import { Paper, Grid, Text, Space, ScrollArea, Box, MediaQuery, Badge } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { TokenInfo } from "~/types/types";
import { useLoaderData } from "@remix-run/react";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import useStyles from "./styles";
import { getTokenInfo } from "~/services/coinservice";
import { CircleCheck } from 'tabler-icons-react';


export const loader: LoaderFunction = async ({ params }) => {
  let tokenInfo: TokenInfo;
  var tokenid: any = params.tokenid;
  const { Result, Error } = (await getTokenInfo(tokenid)) as any;
  console.log(Result);
  if (Result.length > 0) {
    tokenInfo = Result[0];
    return tokenInfo;
  }
  return null
};


function renderTokenDetailContent(
  loaderData: TokenInfo,
  classes: any,
  padding: string
) {

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
            {loaderData.Symbol}
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
        <Grid columns={25} className={classes.wrapper} style={{ height: "auto" }}>
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
            {(loaderData.Network === "") ? "Incognito" : loaderData.Network}
          </Grid.Col>
        </Grid>
        {/* <Grid columns={25} className={classes.wrapper}
          style={{ height: "auto" }}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Verify</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Verified ? 'verified' : 'not verified'}
          </Grid.Col>
        </Grid> */}
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
        <Badge color="green" variant="filled" style={{ textTransform: 'none', fontSize: 12, fontWeight: 500, marginTop: 5 }} p={6} leftSection={<CircleCheck
          size={14}
          strokeWidth={2}
          color={'white'}
          style={{ marginTop: 5 }}
        />} hidden={!loaderData.Verified}>Verified</Badge>
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
    return <></>
  }

}

export default TokenInfoPage;
