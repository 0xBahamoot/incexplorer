import { Text, Card, Table, Paper, Box, ScrollArea } from '@mantine/core';

import React, { FunctionComponent } from 'react'
import { TxData } from '~/types/types';
import useStyles from './styles'
import format from '~/utils/format';

import { Link } from 'react-router-dom';

type Props = {
  txlist?: TxData[]
}

const TxListCard: FunctionComponent<Props> = ({ txlist }) => {
  const { classes } = useStyles();
  const rows = txlist?.map((element, idx) => {
    return (

      <tr key={element.tx_hash} style={{ cursor: 'pointer' }} >
        <td>{format.formatDateTime(element.lock_time)}</td>
        <td><Text variant="link" component={Link} to={"/tx/" + element.tx_hash}>{element.tx_hash}</Text></td>
        <td>{element.block_height}</td>
        <td>{element.shard_id}</td>
        <td><Text sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
          width: 'auto',
          textOverflow: 'ellipsis', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 12, textAlign: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 5,
          display: 'inline-block',
          borderRadius: 6,
        })}>{element.meta_type_name}</Text>

        </td>
        {/* <td></td> */}
      </tr>
    )
  });

  return (
    <Paper radius={12} withBorder className={classes.container}>
      <ScrollArea>
        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
          <thead className={classes.tableThead}>
            <tr>
              <th style={{ wordWrap: 'normal' }}><Text className={classes.tableTheadText}>Time created</Text></th>
              <th><Text className={classes.tableTheadText}>Hash</Text></th>
              <th style={{ wordWrap: 'normal' }}><Text className={classes.tableTheadText}>Block height</Text></th>
              <th><Text className={classes.tableTheadText}>Shard</Text></th>
              <th><Text className={classes.tableTheadText}>Metatype</Text></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

export default TxListCard;