import { Grid, Box, ScrollArea, Space } from "@mantine/core";
import SummaryCard from "../summarycard/summarycard";
import React, { FunctionComponent } from "react";

type Props = {
  items: any;
  scroll?: boolean;
};

const SummaryBox: FunctionComponent<Props> = ({ items, scroll }) => {
  if (scroll == true) {
    return (
      <>
        <ScrollArea
          p={0}
          style={{ width: "100%", whiteSpace: "nowrap", padding: "10px 0" }}
          scrollbarSize={4}
        >
          <div
            style={{
              display: "block",
              overflow: "auto",
              whiteSpace: "nowrap",
              padding: "0 16px",
            }}
          >
            {items.map((item: any) => (
              <div
                key={item.Name}
                style={{
                  minWidth: 230,
                  display: "inline-block",
                  marginRight: 16,
                  position: "relative",
                }}
              >
                <SummaryCard
                  key={item.Name}
                  title={item.Name}
                  content={item.value}
                  changePercent={item.valueChangePercentage}
                  currencyFormat={item.isCurrency}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </>
    );
  } else {
    return (
      <>
        <Grid gutter="lg" columns={20}>
          {items.map((item: any) => (
            <Grid.Col xs={20} sm={10} md={5} lg={5} xl={4} key={item.Name}>
              <SummaryCard
                title={item.Name}
                content={item.value}
                changePercent={item.valueChangePercentage}
                currencyFormat={item.isCurrency}
              />
            </Grid.Col>
          ))}
        </Grid>
      </>
    );
  }
};

export default SummaryBox;
