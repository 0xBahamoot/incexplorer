import { Grid, Box } from '@mantine/core';
import SummaryCard from '../summarycard/summarycard';
import React, { FunctionComponent } from 'react'




type Props = {
  items: any
}

const SummaryBox: FunctionComponent<Props> = ({ items }) => {
  return (
    <>
      <Box p={0}>
        <Grid gutter="lg" columns={15} >
          {items.map((item: any) => (
            <Grid.Col sm={7} md={4} lg={3} xl={3} key={item.Name}>
              <SummaryCard title={item.Name} content={item.Total} type={item.Type} currencyFormat={item.CurrencyFormat} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default SummaryBox;