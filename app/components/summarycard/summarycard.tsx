import { Button,Grid,Paper,Text} from '@mantine/core';

function SummaryCard() {

  return (
    <>
   {/* <Button  variant="light" size="md" compact>SummaryCard</Button> */}
   <Paper shadow="sm" radius="md" p="sm" withBorder>
   <Grid grow gutter="sm">
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
      <Grid.Col span={4}>5</Grid.Col>
    </Grid>
    </Paper>
    </>
    
  );
}

export default SummaryCard;