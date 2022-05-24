import { Button, Card, Table, Paper, Text } from '@mantine/core';

import { Link } from 'react-router-dom';

import React, { FunctionComponent } from 'react'
import { BlockData } from '~/types/types';
import useStyles from './styles'
import format from '~/utils/format';

type Props = {
  blocklist?: BlockData[]
  blockType?: string
}

const BlockListCard: FunctionComponent<Props> = ({ blocklist, blockType }) => {
  const { classes } = useStyles();

  const rows = blocklist?.map((element, idx) => {
    if (idx >= 15) {
      return null
    }

    return (
      <tr key={element.Hash} style={{ cursor: 'pointer' }}>
        <td>{element.Height}</td>
        <td><Text variant="link" component={Link} to={"/block/" + element.Hash + (blockType == 'shardblk') ? '' : '?beacon=true'}>{element.Hash}</Text></td>
        <td style={{ textOverflow: 'ellipsis', maxWidth: 300, overflow: 'hidden' }}>{element.BlockProducer}</td>
        {(blockType == 'shardblk') ? <td>{element.Txs.length}</td> : ''}
        <td>{format.formatUnixDateTime(element.Time)}</td>
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
                <th>Height</th>
                <th>Hash</th>
                <th>Producer</th>
                {(blockType == 'shardblk') ? <th>Txn</th> : ''}
                <th>Time created</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card.Section>
      </Card>
    </Paper>
  );
}

export default BlockListCard;