import { Text, Card, Table, Stack } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { TxData, TxDetail } from "~/types/types";
import useStyles from "./styles";
import format from "~/utils/format";

import { Link } from "react-router-dom";

type Props = {
  txlist?: TxDetail[];
};

const TxListCard: FunctionComponent<Props> = ({ txlist }) => {
  const { classes } = useStyles();

  function getTxText(txhash: String) {
    let result: string = "";
    result = txhash.slice(0, 24) + "..." + txhash.slice(-8);
    return result;
  }
  const rows = txlist?.map((element, idx) => {
    return (
      <tr key={element.Hash} style={{ height: 50, fontSize: 16 }}>
        <td style={{ lineHeight: "14px" }}>
          <Text
            className={classes.txhash}
            variant="link"
            component={Link}
            to={"/tx/" + element.Hash}
          >
            {getTxText(element.Hash)}
          </Text>
        </td>
        <td>
          <Text
            className={classes.otherColumn}
            variant="link"
            component={Link}
            to={"/block/" + element.BlockHash}
          >
            {element.BlockHeight}
          </Text>
        </td>
        <td>
          <Text
            className={classes.otherColumn}
            variant="link"
            component={Link}
            to={"/chain/shard/" + element.ShardID}
          >
            {element.ShardID}
          </Text>
        </td>
        <td>
          <Stack align="flex-start">
            <Text
              sx={(theme) => ({
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
                paddingTop: 2,
                paddingBottom: 2,
                display: "inline-block",
                borderRadius: 6,
                fontWeight: 400,
                marginTop: 2,
                color: "#fff",
              })}
            >
              {element.Metatype}
            </Text>
          </Stack>
        </td>
        <td className={classes.timeColumn}>
          {format.formatDateTime(element.LockTime)}
        </td>
        {/* <td></td> */}
      </tr>
    );
  });

  return (
    <Table verticalSpacing={0} horizontalSpacing={24} fontSize={16}>
      <thead className={classes.tableThead}>
        <tr>
          <th>
            <Text className={classes.tableTheadText}>Hash</Text>
          </th>
          <th style={{ wordWrap: "normal" }}>
            <Text className={classes.tableTheadText}>Block height</Text>
          </th>
          <th>
            <Text className={classes.tableTheadText}>Shard</Text>
          </th>
          <th>
            <Text className={classes.tableTheadText}>Metatype</Text>
          </th>
          <th style={{ wordWrap: "normal" }}>
            <Text className={classes.tableTheadText}>Time created</Text>
          </th>
          {/* <th></th> */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TxListCard;
