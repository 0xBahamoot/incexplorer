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
        >
          <div
            style={{
              display: "block",
              overflow: "auto",
              whiteSpace: "nowrap",
              padding: "0 30px",
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
        <Box p={0}>
          <Grid gutter="lg" columns={15}>
            {items.map((item: any) => (
              <Grid.Col sm={7} md={4} lg={3} xl={3} key={item.Name}>
                <SummaryCard
                  title={item.Name}
                  content={item.value}
                  changePercent={item.valueChangePercentage}
                  currencyFormat={item.isCurrency}
                />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </>
    );
  }
};

export default SummaryBox;
