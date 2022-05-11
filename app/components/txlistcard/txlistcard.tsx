import { Button,Card,Text,Paper, Title,ScrollArea,Space} from '@mantine/core';

import React, { FunctionComponent } from 'react'


type Props = {
   title:string
    viewAllLink?:string|any
  }

const TxListCard: FunctionComponent<Props> = ({ title, viewAllLink }) => {

  return (
    <Paper shadow="sm" radius="md" p="sm" withBorder>
<Card>
  <Card.Section><Title order={4}>{title}</Title>
  <Space h="md" />
  </Card.Section>

  <Card.Section>
  <ScrollArea style={{ height: 300 }}>
      {/* ... content */}
    </ScrollArea>
  </Card.Section>

  <Card.Section>     
       <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        View all
      </Button></Card.Section>
</Card>
    </Paper>
  );
}

export default TxListCard;