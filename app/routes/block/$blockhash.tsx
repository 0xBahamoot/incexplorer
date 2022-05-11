import { Paper, Grid, Text, createStyles } from '@mantine/core';
import { useState } from 'react';
const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    borderColor: "#eee",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    marginBottom:15
  },
}));

function BlockDetail() {

  const [blockLoaded, setBlockLoaded] = useState(false);
  const { classes } = useStyles();

  return (
    <>
    <Paper shadow="sm" radius="md" p="sm" withBorder>
      <Grid columns={24} className={classes.wrapper}>
        {/* Common block info*/}
        <Grid.Col span={4}>
          <Text color="gray">Block height</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Version</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Confirmations</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Timestamp</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Round</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Epoch</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Previous block</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Next block</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Block producer</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Validation data</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Block producer signature</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Aggregated signature	</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>
      {/* Beacon block info*/}

      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Instructions</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>
      {/* Shard block info*/}
      <Grid columns={24} className={classes.wrapper}>
        <Grid.Col span={4}>
          <Text color="gray">Merkle TxS root</Text>
        </Grid.Col>
        <Grid.Col span={20}>1</Grid.Col>
      </Grid>
    </Paper>
    </>
  );
}

export default BlockDetail;