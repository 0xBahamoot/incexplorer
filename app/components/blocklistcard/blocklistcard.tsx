import { Card, Table, Text } from "@mantine/core";

import { Link } from "react-router-dom";

import React, { FunctionComponent } from "react";
import { BlockData } from "~/types/types";
import useStyles from "./styles";
import format from "~/utils/format";

type Props = {
  blocklist?: BlockData[];
  blockType?: string;
};

const BlockListCard: FunctionComponent<Props> = ({ blocklist, blockType }) => {
  const { classes } = useStyles();

  function getBlockHashText(hash: String) {
    let result: string = "";
    result = hash.slice(0, 30) + "..." + hash.slice(-12);
    return result;
  }

  const rows = blocklist?.map((element, idx) => {
    if (idx >= 15) {
      return null;
    }

    return (
      <tr key={element.Hash} style={{ cursor: "pointer", height: 50 }}>
        <td style={{ color: '#fff' }}>{element.Height}</td>
        <td style={{ lineHeight: "14px" }}>
          <Text
            className={classes.blockhash}
            variant="link"
            component={Link}
            to={
              "/block/" +
              element.Hash +
              (blockType == "shardblk" ? "" : "?beacon=true")
            }
          >
            {getBlockHashText(element.Hash)}
          </Text>
        </td>
        <td
          style={{
            textOverflow: "ellipsis",
            maxWidth: 300,
            overflow: "hidden",
            color: '#fff'
          }}
        >
          {element.BlockProducer}
        </td>
        {blockType == "shardblk" ? <td>{(element.TxHashes !== undefined) ? element.TxHashes.length : 0}</td> : null}
        <td style={{ whiteSpace: "nowrap", color: '#757575' }}>
          {format.formatUnixDateTime(element.Time)}
        </td>
      </tr>
    );
  });

  return (
    <Table verticalSpacing={7.5} horizontalSpacing={24} fontSize={16}>
      <thead className={classes.tableThead}>
        <tr>
          <th>
            <Text className={classes.tableTheadText}>Height</Text>
          </th>
          <th>
            <Text className={classes.tableTheadText}>Hash</Text>
          </th>
          <th>
            <Text className={classes.tableTheadText}>Producer</Text>
          </th>
          {blockType == "shardblk" ? (
            <th>
              <Text className={classes.tableTheadText}>Txn</Text>
            </th>
          ) : null}
          <th>
            <Text className={classes.tableTheadText}>Time created</Text>
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default BlockListCard;
