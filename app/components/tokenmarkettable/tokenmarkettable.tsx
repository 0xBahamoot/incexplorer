import { Text, Table, Box, Center, Avatar } from '@mantine/core';

import React, { FunctionComponent } from 'react'
import { TokenInfo } from '~/types/types';
import useStyles from './styles'
import format from '~/utils/format';

import { Link } from 'react-router-dom';
import { getTokenIcon } from '~/services/icons';

type Props = {
  tokenlist?: TokenInfo[]
}

const TokenMarketTable: FunctionComponent<Props> = ({ tokenlist }) => {
  const { classes } = useStyles();

  function getTxText(txhash: String) {
    let result: string = '';
    result = txhash.slice(0, 24) + '...' + txhash.slice(-8);
    return result
  }

  const rows = tokenlist?.map((element, idx) => {
    if (!element.Verified) {
      return null
    }
    return (

      <tr key={element.TokenID} style={{ cursor: 'pointer', height: 50 }} >
        <td style={{ paddingTop: 5 }}>
          <Center inline>
            <Avatar size={32} src={getTokenIcon(element.Symbol)} style={{ zIndex: 1, borderRadius: "100%" }} />
            <Box ml={5} style={{ paddingLeft: 5, fontSize: 16, fontWeight: 400, color: '#fff', whiteSpace: 'nowrap' }}>{element.Name}</Box>
          </Center>
        </td>

        <td style={{ paddingTop: 5 }}><Text style={{
          display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 14,
          textAlign: 'center',
          padding: 3,
        }}>{format.formatAmount({ humanAmount: element.PriceUsd, decimals: 4 })}</Text><Text sx={(theme) => ({
          width: 'auto', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap',
          fontSize: 12,
          textAlign: 'center',
          padding: 3,
          display: 'inline-block',
          borderRadius: 6,
          backgroundColor: !(element.PercentChange24h.includes("-")) ? '#0ECB81' : '#F6465D',
          color: '#fff',
        })}>{element.PercentChange24h}%</Text>
        </td>
      </tr>
    )
  });

  return (
    <Table verticalSpacing={0} horizontalSpacing={24} fontSize={16}>
      <thead className={classes.tableThead}>
        <tr>
          <th><Text className={classes.tableTheadText}>Token</Text></th>
          <th><Text className={classes.tableTheadText}>Price</Text></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default TokenMarketTable;