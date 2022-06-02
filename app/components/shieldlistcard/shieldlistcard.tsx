import { Text, Table, Box, Center, Avatar } from '@mantine/core';

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

  function getTxText(txhash: String) {
    let result: string = '';
    result = txhash.slice(0, 24) + '...' + txhash.slice(-8);
    return result
  }

  const rows = txlist?.map((element, idx) => {
    if (element.amount == 0) {
      return null
    }
    return (

      <tr key={element.tx_hash} style={{ cursor: 'pointer', height: 50 }} >
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Avatar size={32} src={getTokenIcon(element.token_symbol)} />
            <Box ml={5} style={{ paddingLeft: 5, fontSize: 16 }}>{element.token_symbol}</Box>
          </Center>
        </td>
        <td style={{ paddingTop: 5 }}><Text className={classes.txhash} variant="link" component={Link} to={"/tx/" + element.tx_hash}>{getTxText(element.tx_hash)}</Text></td>
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Text style={{ fontSize: 16, display: 'inline-block' }}>
              {format.formatAmount({ humanAmount: element.amount, decimals: 4 })}</Text>

            <Text style={{ backgroundColor: '#303030', padding: '1.5px 8px', borderRadius: 6, display: 'inline-block', fontSize: 14, marginLeft: 8 }}>{element.token_symbol}</Text>

          </Center>
        </td>
        <td style={{ paddingTop: 5 }}><Text sx={(theme) => ({
          // backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
          width: 'auto',
          textOverflow: 'ellipsis', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 16,
          textAlign: 'left',
          paddingLeft: 0,
          paddingRight: 15,
          display: 'inline-block',
          borderRadius: 6,
          color: (element.meta_type_name == 'Shield') ? '#0ECB81' : '#F6465D',
        })}>{element.meta_type_name}</Text>
        </td>
        <td style={{ whiteSpace: 'nowrap', paddingTop: 5, fontSize: 16 }}>{format.formatDateTime(element.lock_time)}
        </td>
      </tr>
    )
  });

  return (
    <Table verticalSpacing={0} horizontalSpacing="md">
      <thead className={classes.tableThead}>
        <tr>
          <th><Text className={classes.tableTheadText}>Token</Text></th>
          <th><Text className={classes.tableTheadText}>Hash</Text></th>
          <th><Text className={classes.tableTheadText}>Amount</Text></th>
          <th><Text className={classes.tableTheadText}>Type</Text></th>
          <th><Text className={classes.tableTheadText}>Time created</Text></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default ShieldListCard;