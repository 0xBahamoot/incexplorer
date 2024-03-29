import {
  Paper,
  Grid,
  Text,
  Space,
  ScrollArea,
  Box,
  MediaQuery,
  Center,
} from "@mantine/core";
import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { TxDetail } from "~/types/types";
import { useLoaderData } from "@remix-run/react";
import { getDetailTx, getDetailTxFromCsv } from "~/services/transactions";
import SectionTitle from "~/components/sectiontitle/sectiontitle";
import useStyles from "./styles";
import format from "~/utils/format";

import { Link } from "react-router-dom";
const PrettyPrintJson = (data: any) => (
  <div>
    <pre style={{ wordWrap: "normal", whiteSpace: "pre-wrap" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export const loader: LoaderFunction = async ({ params }) => {
  let txdetail: TxDetail;
  var txhash: any = params.txhash;
  try {
    const { Result, Error } = (await getDetailTxFromCsv(txhash)) as any;
    console.log(Result[0]);
    txdetail = Result[0].TxDetail;
    return txdetail;
  } catch (error) {
    return null;
  }
};

function renderTxDetailContent(
  loaderData: TxDetail,
  classes: any,
  padding: string
) {
  let requestTx: string = "";
  if (loaderData.Metadata) {
    const md = JSON.parse(loaderData.Metadata);
    if (md.RequestTxID) {
      requestTx = md.RequestTxID;
      console.log("requestTx", requestTx);
    }
    if (md.ReqTxID) {
      requestTx = md.ReqTxID;
      console.log("requestTx", requestTx);
    }
  }

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
            <Text className={classes.propertyName}>Status</Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            {" "}
            <Text
              style={{
                backgroundColor: "#303030",
                width: "auto",
                textOverflow: "ellipsis",
                maxWidth: 250,
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontSize: 16,
                textAlign: "center",
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 1,
                paddingBottom: 1,
                display: "inline-block",
                borderRadius: 6,
                fontWeight: 400,
                color: "#fff",
                marginTop: -2,
              }}
            >
              {loaderData.IsInBlock ? "Success" : "Pending"}
            </Text>
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>TxHash</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Hash}
          </Grid.Col>
        </Grid>
        {requestTx !== "" ? (
          <Grid columns={25} className={classes.wrapper}>
            <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
              <Text className={classes.propertyName}>RequestTx</Text>
            </Grid.Col>
            <Grid.Col
              xs={20}
              sm={23}
              md={23}
              lg={20}
              xl={20}
              className={classes.propertyValue}
            >
              <Text variant="link" component={Link} to={"/tx/" + requestTx}>
                {requestTx}
              </Text>
            </Grid.Col>
          </Grid>
        ) : null}

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>ShardID</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.ShardID}
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Block</Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <Text
              variant="link"
              component={Link}
              to={"/block/" + loaderData.BlockHash}
            >
              {loaderData.BlockHash}
            </Text>
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Block height</Text>
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
              humanAmount: loaderData.BlockHeight,
              decimals: 4,
            })}
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Network Fee</Text>
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
              originalAmount: loaderData.Fee,
              decimals: 9,
            })}{" "}
            PRV
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Version</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Version}
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Timestamp</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.LockTime}
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Type</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Metatype}
          </Grid.Col>
        </Grid>

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Memo</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Info}
          </Grid.Col>
        </Grid>
      </Paper>

      <Space h="md" />

      <Paper
        radius={padding == "0px 16px" ? 0 : "md"}
        p={0}
        className={classes.container}
        style={{ borderWidth: padding == "0px 16px" ? "1px 0px" : "1px" }}
      >
        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Metadata</Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
              <PrettyPrintJson
                data={
                  loaderData.Metadata != ""
                    ? JSON.parse(loaderData.Metadata)
                    : null
                }
              ></PrettyPrintJson>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Paper>
      <Space h="md" />

      <Paper
        radius={padding == "0px 16px" ? 0 : "md"}
        p={0}
        className={classes.container}
        style={{ borderWidth: padding == "0px 16px" ? "1px 0px" : "1px" }}
      >
        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>SigPubkey</Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 100 }} scrollbarSize={4}>
              <Text>{loaderData.SigPubKey}</Text>
            </ScrollArea>
          </Grid.Col>
        </Grid>

        <Grid columns={25} className={classes.wrapper}>
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Sig</Text>
          </Grid.Col>
          <Grid.Col
            xs={20}
            sm={23}
            md={23}
            lg={20}
            xl={20}
            className={classes.propertyValue}
          >
            {loaderData.Sig}
          </Grid.Col>
        </Grid>

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>
              Proof (base58check encode)
            </Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 100 }} scrollbarSize={4}>
              <Text style={{ wordBreak: "break-all" }}>{loaderData.Proof}</Text>
            </ScrollArea>
          </Grid.Col>
        </Grid>

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>Proof detail</Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
              <PrettyPrintJson data={loaderData.ProofDetail}></PrettyPrintJson>
            </ScrollArea>
          </Grid.Col>
        </Grid>

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>
              Transacted privacy coin
            </Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
              <PrettyPrintJson
                data={
                  loaderData.PrivacyCustomTokenData != ""
                    ? JSON.parse(loaderData.PrivacyCustomTokenData)
                    : ""
                }
              ></PrettyPrintJson>
            </ScrollArea>
          </Grid.Col>
        </Grid>

        <Grid
          columns={25}
          className={classes.wrapper}
          style={{ height: "auto" }}
        >
          <Grid.Col xs={5} sm={2} md={2} lg={5} xl={5}>
            <Text className={classes.propertyName}>
              Privacy coin proof detail
            </Text>
          </Grid.Col>
          <Grid.Col xs={20} sm={23} md={23} lg={20} xl={20}>
            <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
              <PrettyPrintJson
                data={loaderData.PrivacyCustomTokenProofDetail}
              ></PrettyPrintJson>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}

function renderTxDetail(loaderData: TxDetail, classes: any, padding: string) {
  return (
    <>
      <Box style={{ padding: padding }}>
        <SectionTitle text={"Transaction Details"} />
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
          {renderTxDetailContent(loaderData, classes, padding)}
        </ScrollArea>
      ) : (
        <Box style={{ padding: padding }}>
          {renderTxDetailContent(loaderData, classes, padding)}
        </Box>
      )}
    </>
  );
}

function Tx() {
  const loaderData: TxDetail = useLoaderData();
  const { classes } = useStyles();
  if (loaderData) {
    return (
      <>
        <Space h={30} />

        <MediaQuery largerThan={1440} styles={{ display: "none" }}>
          <div>{renderTxDetail(loaderData, classes, "0px 16px")}</div>
        </MediaQuery>

        <MediaQuery smallerThan={1440} styles={{ display: "none" }}>
          <div>{renderTxDetail(loaderData, classes, "0px 30px")}</div>
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
              Oh no! Tx not found
            </Text>
          </Box>
        </Center>
      </>
    );
  }
}

export default Tx;
