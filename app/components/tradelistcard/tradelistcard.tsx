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

const TradeListCard: FunctionComponent<Props> = ({ txlist }) => {
  const { classes } = useStyles();
  console.log(txlist)
  function getTxText(txhash: String) {
    let result: string = '';
    result = txhash.slice(0, 24) + '...' + txhash.slice(-8);
    return result
  }

  const rows = txlist?.map((element, idx) => {
    let txType: string = 'response'

    if (element.meta_type_name.toLowerCase().indexOf('request') >= 0) {
      txType = 'request'
    }

    if (element.amount == 0) {
      return null
    }
    return (

      <tr key={element.tx_hash} style={{ cursor: 'pointer', height: 50 }} >
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Avatar size={32} src={getTokenIcon(element.pdex_sell_token_symbol)} style={{ zIndex: 1, borderRadius: "100%" }} />
            <Box ml={5} style={{ paddingLeft: 5, fontSize: 16, fontWeight: 400, color: '#fff', whiteSpace: 'nowrap' }}>{element.pdex_sell_token_symbol}</Box>
          </Center>
        </td>
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Text style={{ fontSize: 16, display: 'inline-block', color: '#fff' }}>
              {format.formatAmount({ humanAmount: element.pdex_sell_amount, decimals: 4 })}</Text>

            <Text style={{ backgroundColor: '#303030', padding: '1.5px 8px', borderRadius: 6, display: 'inline-block', fontSize: 14, marginLeft: 8, color: '#fff', fontWeight: 400 }}>{element.pdex_sell_token_symbol}</Text>

          </Center>
        </td>
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Avatar size={32} src={getTokenIcon(element.pdex_buy_token_symbol)} style={{ zIndex: 1, borderRadius: "100%" }} />
            <Box ml={5} style={{ paddingLeft: 5, fontSize: 16, fontWeight: 400, color: '#fff', whiteSpace: 'nowrap' }}>{element.pdex_buy_token_symbol}</Box>
          </Center>
        </td>
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Text style={{ fontSize: 16, display: 'inline-block', color: '#fff' }}>
              {format.formatAmount({ humanAmount: element.pdex_buy_amount, decimals: 4 })}</Text>

            <Text style={{ backgroundColor: '#303030', padding: '1.5px 8px', borderRadius: 6, display: 'inline-block', fontSize: 14, marginLeft: 8, color: '#fff', fontWeight: 400 }}>{element.pdex_buy_token_symbol}</Text>

          </Center>
        </td>

        <td style={{ paddingTop: 5 }}><Text className={classes.txhash} variant="link" component={Link} to={"/tx/" + element.tx_hash}>{getTxText(element.tx_hash)}</Text></td>

        <td style={{ paddingTop: 5 }}><Text style={{ fontSize: 16, display: 'inline-block', color: '#fff' }}>{txType}</Text></td>


        <td style={{ paddingTop: 5 }}><Text sx={(theme) => ({
          width: 'auto',
          textOverflow: 'ellipsis', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 16,
          textAlign: 'left',
          paddingLeft: 0,
          paddingRight: 15,
          display: 'inline-block',
          borderRadius: 6,
          color: (element.side == 'Buy') ? '#0ECB81' : '#F6465D',
        })}>{element.side}</Text>
        </td>
        <td style={{ whiteSpace: 'nowrap', paddingTop: 5, fontSize: 16, color: '#757575' }}>{format.formatDateTime(element.lock_time)}
        </td>
      </tr>
    )
  });

  return (
    <Table verticalSpacing={0} horizontalSpacing={24} fontSize={16}>
      <thead className={classes.tableThead}>
        <tr>
          <th><Text className={classes.tableTheadText}>Sell Token</Text></th>
          <th><Text className={classes.tableTheadText}>Sell Amount</Text></th>
          <th><Text className={classes.tableTheadText}>Buy Token</Text></th>
          <th><Text className={classes.tableTheadText}>Buy Amount</Text></th>
          <th><Text className={classes.tableTheadText}>Hash</Text></th>
          <th><Text className={classes.tableTheadText}>Type</Text></th>
          <th><Text className={classes.tableTheadText}>Side</Text></th>
          <th><Text className={classes.tableTheadText}>Time created</Text></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default TradeListCard;