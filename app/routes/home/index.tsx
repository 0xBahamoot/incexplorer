import { Grid,Space} from '@mantine/core';
import SummaryCard from '~/components/summarycard/summarycard';
import TxListCard from '~/components/txlistcard/txlistcard';
import BlockListCard from '~/components/blocklistcard/blocklistcard';
function Home() {

  return (
    <>
    <SummaryCard></SummaryCard>
    <Space h="md" />
    <Grid grow>
      <Grid.Col span={4}> <BlockListCard title={"Latest Blocks"}></BlockListCard></Grid.Col>
      <Grid.Col span={4}> <TxListCard title={"Latest Transactions"}></TxListCard></Grid.Col>
    </Grid>
  
    </>
    
  );
}

export default Home;