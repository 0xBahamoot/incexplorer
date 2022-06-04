import { Paper, Text, Image } from "@mantine/core";
import React, { FunctionComponent } from "react";
import useStyles from "./styles";
import format from "~/utils/format";
import moment from "moment";
import { CaretUp, CaretDown } from "tabler-icons-react";

type Props = {
  title: string;
  content: any;
  changePercent?: number;
  currencyFormat: boolean;
};

const SummaryCard: FunctionComponent<Props> = ({
  title,
  content,
  currencyFormat,
  changePercent,
}) => {
  const { classes } = useStyles();
  return (
    <>
      <Paper
        shadow="sm"
        radius="md"
        p={"18px 18px 17px"}
        withBorder
        className={classes.paper}
      >
        <p className={classes.title}>{title}</p>
        {typeof content === "string" || content instanceof String ? (
          <Text className={classes.content}>{content}</Text>
        ) : (
          <Text className={classes.content}>
            {currencyFormat ? "$" : ""}
            {format.formatAmount({ humanAmount: content, decimals: 4 })}
          </Text>
        )}

        {changePercent != 0 && changePercent !== undefined ? (
          <Text
            className={classes.subcontent}
            style={{ color: changePercent >= 0 ? "#0ECB81" : "#F6465D" }}
          >
            <span style={{ paddingTop: 5, paddingRight: 2 }}>
              {changePercent >= 0 ? (
                <CaretUp
                  size={18}
                  strokeWidth={4}
                  fill={"#0ECB81"}
                  color={"#0ECB81"}
                />
              ) : (
                <CaretDown
                  size={18}
                  strokeWidth={4}
                  fill={"#F6465D"}
                  color={"#F6465D"}
                />
              )}
            </span>{" "}
            {format.formatAmount({ humanAmount: changePercent, decimals: 2 })}%
          </Text>
        ) : (
          <Text
            className={classes.subcontent}
            style={{ color: "#757575", fontSize: 14, paddingTop: 5 }}
          >
            {moment().format("MM/DD/YYYY")}
          </Text>
        )}

        <div className={classes.graphic}>
          <Image
            alt="logo"
            src={"/assets/images/graphics/quarter.svg"}
            height={52}
            width={70}
          />
        </div>
      </Paper>
    </>
  );
};

export default SummaryCard;
