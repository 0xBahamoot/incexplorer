import { Text, Card, Table, Paper, Box, Center } from '@mantine/core';
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


  function getTxText(txhash: String) {
    let result: string = '';
    result = txhash.slice(0, 24) + '...' + txhash.slice(-8);
    return result
  }
  const rows = txlist?.map((element, idx) => {
    return (
      <tr key={element.tx_hash} style={{ cursor: 'pointer' }} >
        <td className={classes.timeColumn}>{format.formatDateTime(element.lock_time, 'DD MMM HH:mm A')}</td>
        <td><Text className={classes.txhash} variant="link" component={Link} to={"/tx/" + element.tx_hash}>
          {/* <Center>
            <p>{element.tx_hash}</p>
            <p>{element.tx_hash.slice(element.tx_hash.length - 8, element.tx_hash.length)}</p>
          </Center> */}
          {getTxText(element.tx_hash)}
        </Text></td>
        <td className={classes.otherColumn}>{element.block_height}</td>
        <td className={classes.otherColumn}>{element.shard_id}</td>
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
          fontWeight: 400,
          color: '#fff',
        })}>{element.meta_type_name}</Text>
        </td>
        {/* <td></td> */}
      </tr>
    )
  });

  return (
    <Paper radius={12} className={classes.container}>
      <Table verticalSpacing="sm" horizontalSpacing="md">
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
    </Paper>
  );
}

export default TxListCard;