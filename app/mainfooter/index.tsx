import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Center, Divider, Title } from '@mantine/core';
import { Sun, MoonStars, Search, ChevronDown } from 'tabler-icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TokenPriceChip from '~/components/tokenpricechip/tokenpricechip';
import { Popover, Badge, Text } from '@mantine/core';

function MainFooter() {
  const [subMenuBC, setSubMenuBC] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <Group position="apart" grow>
        <Group position="left">
          <Center style={{ width: 150, height: 60 }}>
            <Title order={5}>© 2022 Incognito</Title>
          </Center>
        </Group>
        <Group position="right" style={{ paddingRight: 10 }}>
          <TokenPriceChip tokenid='0000004' />
          <Button variant="subtle" color="dark" size="md" compact component="a" target={"_blank"} href="https://incognito.org/mediakit">Media kit</Button>
          <Button variant="subtle" color="dark" size="md" compact component="a" target={"_blank"} href="https://t.me/incognitochain">Telegram</Button>
          <Button variant="subtle" color="dark" size="md" compact component="a" target={"_blank"} href="https://twitter.com/IncognitoChain">Twitter</Button>
        </Group>
      </Group>
    </>

  );
}

export default MainFooter;