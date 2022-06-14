import { Paper, Text, Image } from "@mantine/core";
import React, { FunctionComponent } from "react";
import useStyles from "./styles";
import format from "~/utils/format";
import moment from "moment";
import { CaretUp, CaretDown } from "tabler-icons-react";

type Props = {
  title: string;
  content: any;
  currencyFormat: boolean;
  contentSize: string;
  changePercent?: number;
};

const SummaryCard: FunctionComponent<Props> = ({
  title,
  content,
  currencyFormat,
  contentSize,
  changePercent,
}) => {
  const { classes } = useStyles();
  return (
    <>
      <Paper
        shadow="sm"
        radius="md"
        p={contentSize === "small" ? "14px" : "18px 18px 17px"}
        withBorder
        className={classes.paper}
      >
        <p
          className={classes.title}
          style={{ fontSize: contentSize === "small" ? 14 : 16 }}
        >
          {title}
        </p>
        {typeof content === "string" || content instanceof String ? (
          <Text
            className={classes.content}
            style={{
              fontSize: contentSize === "small" ? 18 : 22,
              margin: contentSize === "small" ? "10px 0 0" : "14px 0 5px",
            }}
          >
            {content}
          </Text>
        ) : (
          <Text
            className={classes.content}
            style={{
              fontSize: contentSize === "small" ? 18 : 22,
              margin: contentSize === "small" ? "12px 0 0" : "14px 0 5px",
            }}
          >
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
            style={{ color: "#757575", paddingTop: 5 }}
          >
            {moment().format("MM/DD/YYYY")}
          </Text>
        )}

        <div className={classes.graphic}>
          <Image
            alt="logo"
            src={"/assets/images/graphics/quarter.svg"}
            height={72}
            width={90}
          />
        </div>
      </Paper>
    </>
  );
};

export default SummaryCard;
