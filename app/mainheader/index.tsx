import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Stack, MediaQuery, Burger, Drawer, useMantineTheme } from '@mantine/core';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Link } from 'react-router-dom';

import { Popover, Badge, Text } from '@mantine/core';

function MainHeader() {
  const [subMenuBC, setSubMenuBC] = useState(false);
  const [subMenuNetwork, setSubMenuNetwork] = useState(false);
  const [subMenuChart, setSubMenuChart] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';

  const [chainNetwork, setChainNetwork] = useLocalStorage({
    key: 'chainnetwork',
    defaultValue: 'mainnet',
    getInitialValueInEffect: true,
  });

  function switchNetwork(network: string) {
    setChainNetwork(network);
    window.location.reload();
  }

  return (
    <>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>
      <MediaQuery largerThan={1200} styles={{ display: 'none' }}>

        <Group position="apart">
          <Group position="left">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
            // mr="xl"
            />

            <MediaQuery smallerThan={450} styles={{ display: 'none' }}>
              <a href="/">
                <Image alt="logo" src={dark ? "/assets/images/logo_h_white.svg" : "/assets/images/logo_h_dark.svg"} height={30} />
              </a>
            </MediaQuery>
          </Group>

          <Group position="right">
            <TextInput
              placeholder="search tx / block / token"
              variant="filled"
              radius="md"
              icon={<Search size={14} />} style={{ width: 240 }}
            />
          </Group>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={1200} styles={{ display: 'none' }}>
        <Group position="apart">
          <Group position="left">
            <a href="/">
              <Image alt="logo" src={dark ? "/assets/images/logo_h_white.svg" : "/assets/images/logo_h_dark.svg"} height={30} />
            </a>
            {/* <Popover
              opened={subMenuBC}
              onClose={() => setSubMenuBC(false)}
              position="bottom"
              placement="center"
              withArrow
              trapFocus={false}
              closeOnEscape={false}
              onMouseEnter={() => setSubMenuBC(true)}
              onMouseLeave={() => setSubMenuBC(false)}
              // transition="pop-top-left"
              // width={180}
              target={
                <Button variant="subtle" color="dark" size="md" compact rightIcon={<ChevronDown
                  size={15}
                  strokeWidth={3}
                // color={'black'}
                />}
                  onMouseEnter={() => setSubMenuBC(true)} onMouseLeave={() => setSubMenuBC(false)}>Blockchain</Button>
              }
            >
              <Stack align="flex-start" justify="flex-start">
                <Button variant="subtle" color={"dark"} compact component={Link} to="/blockexplorer">Beacon Chain</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/blockexplorer">Shard Chains</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/txs">Transactions</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/pendingtxs">Pending TXs</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/ptokens">pTokens</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/validators">Validators</Button>
              </Stack>
            </Popover>
            <Popover
              opened={subMenuChart}
              onClose={() => setSubMenuChart(false)}
              position="bottom"
              placement="center"
              withArrow
              trapFocus={false}
              closeOnEscape={false}
              onMouseEnter={() => setSubMenuChart(true)}
              onMouseLeave={() => setSubMenuChart(false)}
              // transition="pop-top-left"
              // width={180}
              target={
                <Button variant="subtle" color="dark" size="md" compact rightIcon={<ChevronDown
                  size={15}
                  strokeWidth={3}
                // color={'black'}
                />}
                  onMouseEnter={() => setSubMenuChart(true)} onMouseLeave={() => setSubMenuChart(false)}>Charts</Button>
              }
            >
              <Stack align="flex-start" justify="flex-start">
                <Button variant="subtle" color={"dark"} compact component={Link} to="/charts/tradingvolume">Trading Volume</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/charts/liquiditytvl">Liquidity TVL</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/charts/shieldvolume">Shielding Volume</Button>
                <Button variant="subtle" color={"dark"} compact component={Link} to="/charts">View all</Button>
              </Stack>
            </Popover> */} </Group>

          <Group position="right">
            <TextInput
              placeholder="search transaction / block / token"
              variant="filled"
              radius="md"
              icon={<Search size={14} />} style={{ width: 300 }}
            />
            <Button variant="subtle" color="dark" size="md" compact component={Link} to="/">Explore</Button>
            <Button variant="subtle" color="dark" size="md" compact component="a" target={"_blank"} href="https://incognito.org/apps">About us</Button>
            <Button variant="subtle" color="dark" size="md" compact component="a" target={"_blank"} href="https://we.incognito.org/">Community</Button>

            {/* <Popover
              opened={subMenuNetwork}
              onClose={() => setSubMenuNetwork(false)}
              position="bottom"
              placement="center"
              withArrow
              trapFocus={false}
              closeOnEscape={false}
              onMouseEnter={() => setSubMenuNetwork(true)}
              onMouseLeave={() => setSubMenuNetwork(false)}
              // transition="pop-top-left"
              // width={180}
              target={
                <Button
                  onMouseEnter={() => setSubMenuNetwork(true)} onMouseLeave={() => setSubMenuNetwork(false)} variant="light" size="md" compact >{(chainNetwork == "mainnet") ? "mainnet" : "testnet"}</Button>
              }
            >
              <Stack align="flex-start" justify="flex-start">
                <Button variant="subtle" color={"dark"} compact onClick={() => { switchNetwork("mainnet") }}>Incognito Mainnet</Button>
                <Button variant="subtle" color={"dark"} compact onClick={() => { switchNetwork("testnet") }}>Incognito Testnet</Button>
              </Stack>
            </Popover> */}
            {/* <ActionIcon
              variant="light"
              size="lg"
              radius="md"
              // color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title=""
            >
              {dark ? <Sun size={24} /> : <MoonStars size={24} />}
            </ActionIcon> */}
          </Group>
        </Group>
      </MediaQuery>
    </>

  );
}

export default MainHeader;