import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Center, Divider, Title } from '@mantine/core';
import { useState } from 'react';
import useStyles from './styles'

function MainFooter() {
  const [subMenuBC, setSubMenuBC] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { classes } = useStyles();

  return (
    <>
      <Group position="apart" grow style={{ padding: '0 30px' }}>
        <Group position="left">
          <Center style={{ width: 150, height: 50 }}>
            <Title order={5} style={{ color: '#757575', fontWeight: 500 }}>© 2022 Incognito</Title>
          </Center>
        </Group>
        <Group position="right">
          {/* <TokenPriceChip tokenid='0000004' /> */}
          <Button variant="subtle" color="gray" className={classes.btn} size="md" compact component="a" target={"_blank"} href="https://incognito.org/mediakit">Media kit</Button>
          <Button variant="subtle" color="gray" className={classes.btn} size="md" compact component="a" target={"_blank"} href="https://t.me/incognitochain">Telegram</Button>
          <Button variant="subtle" color="gray" className={classes.btn} size="md" compact component="a" target={"_blank"} href="https://twitter.com/IncognitoChain">Twitter</Button>
        </Group>
      </Group>
    </>

  );
}

export default MainFooter;