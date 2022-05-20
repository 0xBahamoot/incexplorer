import { Button, Card, Table, Paper, Box } from '@mantine/core';

import React, { FunctionComponent } from 'react'
import { TxData } from '~/types/types';
import useStyles from './styles'
import format from '~/utils/format';

type Props = {
  txlist?: TxData[]
}

const TxListCard: FunctionComponent<Props> = ({ txlist }) => {
  const { classes } = useStyles();
  const rows = txlist?.map((element, idx) => {
    if (idx >= 15) {
      return null
    }

    return (

      <tr key={element.tx_hash} style={{ cursor: 'pointer' }}>
        <td>{format.formatDateTime(element.lock_time)}</td>
        <td>{element.tx_hash}</td>
        <td>{element.block_height}</td>
        <td>{element.shard_id}</td>
        <td>
          <Box
            sx={(theme) => ({
              backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
              textAlign: 'center',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
              width: 'auto',
              display: 'inline-block',
              borderRadius: 6,
              fontSize: 12
            })}
          >{element.meta_type_name}
          </Box>
        </td>
        {/* <td></td> */}
      </tr>
    )
  });

  return (
    <Paper radius={12} withBorder className={classes.container}>
      <Card className={classes.container} radius={12} >
        <Card.Section>
          <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
            <thead className={classes.tableThead}>
              <tr>
                <th>Date</th>
                <th>Hash</th>
                <th>Block height</th>
                <th>Shard</th>
                <th>Metatype</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card.Section>
      </Card>
    </Paper>
  );
}

export default TxListCard;