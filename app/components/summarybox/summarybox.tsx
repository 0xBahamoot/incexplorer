import { Grid, Box } from '@mantine/core';
import SummaryCard from '../summarycard/summarycard';
import React, { FunctionComponent } from 'react'




type Props = {
  items: any
}

const SummaryBox: FunctionComponent<Props> = ({ items }) => {
  return (
    <>
      <Box p="sm">
        <Grid gutter="lg" columns={15}>
          {items.map((item: any) => (
            <Grid.Col span={3} key={item.Name}>
              <SummaryCard title={item.Name} content={item.Total} type={item.Type} currencyFormat={item.CurrencyFormat} description='exchanged in the last 24h' />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default SummaryBox;