import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Stack, MediaQuery, Burger, Drawer, useMantineTheme } from '@mantine/core';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Link } from 'react-router-dom';

// import { useLocation } from 'react-router-dom';

function MainHeader() {
  // let location = useLocation();

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

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setOpened(false);
  //   }
  // }, [location])

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
        <Group position="apart" grow>
          <Group position="left">
            <a href="/">
              <Image alt="logo" src={dark ? "/assets/images/logo_h_white.svg" : "/assets/images/logo_h_dark.svg"} style={{ marginLeft: 25 }} height={30} />
            </a></Group>

          <Group position='center'>
            <Button variant="subtle" color="gray" size="md" compact component={Link} to="/">Explore</Button>
            <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://incognito.org/apps">About us</Button>
            <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://we.incognito.org/">Community</Button>
          </Group>
          <Group position="right">
            <TextInput
              placeholder="search transaction / block / token"
              variant="filled"
              radius="md"
              icon={<Search size={14} />} style={{ width: 300 }}
            />

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