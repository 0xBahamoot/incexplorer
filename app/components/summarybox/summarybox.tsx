import { Grid, Box, Loader, Group } from '@mantine/core';
import SummaryCard from '../summarycard/summarycard';
import { useState, useEffect } from 'react';
import { getDashboard, getSummary } from '~/services/summary';

function SummaryBox() {
  const [summaryData, setSummaryData] = useState<any>([]);
  const [loaded, setLoaded] = useState(false)
  const handleFetchData = async () => {
    setLoaded(false);
    let data1 = (await getDashboard()) as any;
    let data2 = (await getSummary()) as any;
    let data = data1.Result;
    data = data.concat(data2.Result);
    setSummaryData(data);
    setLoaded(true);
  }


  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <>
      <Box p="sm">
        <Group position="center" style={{ height: !loaded ? 200 : 0 }}>
          <Loader color="gray" size={30} style={{ height: !loaded ? 200 : 0 }} />
        </Group>

        <div style={{ height: loaded ? 'auto' : 0, overflow: 'hidden' }}>
          <Grid gutter="lg" columns={15}>
            {summaryData.map((item: any) => (
              <Grid.Col span={3} key={item.Name}>
                <SummaryCard title={item.Name} content={item.Total} type={item.Type} currencyFormat={item.CurrencyFormat} description='exchanged in the last 24h' />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Box>
    </>

  );
}

export default SummaryBox;