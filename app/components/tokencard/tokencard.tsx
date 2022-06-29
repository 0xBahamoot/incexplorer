import { Card, Text } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { TokenInfo } from "~/types/types";
import useStyles from "./styles";

type Props = {
  tokeninfo: TokenInfo
};

const TokenCard: FunctionComponent<Props> = ({ tokeninfo }) => {
  const { classes } = useStyles();

  function getTokenHashText(hash: String) {
    let result: string = "";
    result = hash.slice(0, 30) + "..." + hash.slice(-12);
    return result;
  }

  return (
    <Card>

    </Card>
  );
};

export default TokenCard;
