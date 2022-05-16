import { Grid, Box } from '@mantine/core';
import SummaryCard from '../summarycard/summarycard';
import { useState, useEffect } from 'react';
import { getDashboard, getSummary } from '~/services/summary';

function SummaryBox() {
  const [summaryData, setSummaryData] = useState<any>([]);

  const handleFetchData = async () => {
    let data1 = (await getDashboard()) as any;
    let data2 = (await getSummary()) as any;
    console.log("data", data1, data2);
    let data = data1.Result;
    data = data.concat(data2.Result);
    setSummaryData(data);
    console.log("data", data);
  }


  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Box p="sm">
        <Grid gutter="lg" columns={15}>
          {summaryData.map((item: any) => (
            <Grid.Col span={3} key={item.Name}>
              <SummaryCard title={item.Name} content={item.Total} type={item.Type} currencyFormat={item.CurrencyFormat} subtext='exchanged in the last 24h' />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </>

  );
}

export default SummaryBox;