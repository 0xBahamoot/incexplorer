import { Text, Card, Table, Paper, Box, ScrollArea, Center, Avatar } from '@mantine/core';

import React, { FunctionComponent } from 'react'
import { TxData } from '~/types/types';
import useStyles from './styles'
import format from '~/utils/format';

import { Link } from 'react-router-dom';
import { getTokenIcon } from '~/services/icons';

type Props = {
  txlist?: TxData[]
}

const ShieldListCard: FunctionComponent<Props> = ({ txlist }) => {
  const { classes } = useStyles();
  const rows = txlist?.map((element, idx) => {
    if (element.amount == 0) {
      return null
    }
    return (

      <tr key={element.tx_hash} style={{ cursor: 'pointer' }} >
        <td>
          <Center inline>
            <Avatar size={32} src={getTokenIcon(element.token_symbol)} />
            <Box ml={5} style={{ paddingLeft: 5 }}>{element.token_symbol}</Box>
          </Center>
        </td>
        <td><Text variant="link" component={Link} to={"/tx/" + element.tx_hash}>{element.tx_hash}</Text></td>
        <td>
          <Center inline>
            <Text style={{ fontSize: 18, display: 'inline-block' }}>
              {format.formatAmount({ humanAmount: element.amount, decimals: 4 })}</Text>

            <Text style={{ backgroundColor: '#303030', padding: '1.5px 8px', borderRadius: 6, display: 'inline-block', fontSize: 14, marginLeft: 8 }}>{element.token_symbol}</Text>

          </Center>
        </td>
        <td><Text sx={(theme) => ({
          // backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
          width: 'auto',
          textOverflow: 'ellipsis', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 18,
          textAlign: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 5,
          display: 'inline-block',
          borderRadius: 6,
          color: (element.meta_type_name == 'Shield') ? '#0ECB81' : '#F6465D',
        })}>{element.meta_type_name}</Text>
        </td>
        <td>{format.formatDateTime(element.lock_time)}
        </td>
      </tr>
    )
  });

  return (
    <Paper radius={12} withBorder className={classes.container}>
      <ScrollArea>
        <Table highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
          <thead className={classes.tableThead}>
            <tr>
              <th><Text className={classes.tableTheadText}>Token</Text></th>
              <th><Text className={classes.tableTheadText}>Hash</Text></th>
              <th><Text className={classes.tableTheadText}>Amount</Text></th>
              <th><Text className={classes.tableTheadText}>Type</Text></th>
              <th><Text className={classes.tableTheadText}>Time</Text></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

      </ScrollArea>
    </Paper>
  );
}

export default ShieldListCard;