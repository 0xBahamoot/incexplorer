import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Text, Center, MediaQuery, Burger, Drawer, useMantineTheme, Loader } from '@mantine/core';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { SpotlightProvider } from '@mantine/spotlight';

import { useFetcher } from "@remix-run/react";
import { showNotification } from '@mantine/notifications';
import { NotificationsProvider } from '@mantine/notifications';

// import { useLocation } from 'react-router-dom';

function MainHeader() {
  // let location = useLocation();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const fetcher = useFetcher();
  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';
  let navigate = useNavigate();

  const [chainNetwork, setChainNetwork] = useLocalStorage({
    key: 'chainnetwork',
    defaultValue: 'mainnet',
    getInitialValueInEffect: true,
  });

  function switchNetwork(network: string) {
    setChainNetwork(network);
    window.location.reload();
  }

  function search(event: React.KeyboardEvent<HTMLInputElement>) {
    if ((event.key === "Enter") && (searchValue.length > 0)) {
      setSearching(true)
      fetcher.load(`/search/${searchValue}`);
    }

  }

  useEffect(() => {
    const result = fetcher.data;
    if (result) {
      console.log("result", result);
      if (result.IsBeaconBlock) {
        navigate(`/block/${searchValue}?beacon=true`, { replace: true });
        return
      }

      if (result.IsBlock) {
        navigate(`/block/${searchValue}`, { replace: true });
        return
      }

      if (result.IsTransaction) {
        navigate(`/tx/${searchValue}`, { replace: true });
        return
      }

      showNotification({
        autoClose: 5000,
        title: 'Search result',
        message: 'Hash not found!',
        color: 'red',
        radius: 'md'
      })
    }
  }, [fetcher.data]);

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setOpened(false);
  //   }
  // }, [location])

  return (
    <>
      {/* <SpotlightProvider shortcut={['mod + P', 'mod + K', '/']} actions={[]} nothingFoundMessage="Nothing found..." searchPlaceholder="Search anything..." searchIcon={<Search size={18} />}>

      </SpotlightProvider> */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>

      <NotificationsProvider position="top-right" zIndex={2077}>
      </NotificationsProvider>
      <MediaQuery largerThan={1200} styles={{ display: 'none' }}>

        <Group position="apart">
          <Group position="left">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
            />

            <MediaQuery smallerThan={450} styles={{ display: 'none' }}>
              <Center>
                <a href="/">
                  <Image alt="logo" src={dark ? "/assets/images/logo_h_white.svg" : "/assets/images/logo_h_dark.svg"} height={30} />
                </a>

                <Text sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
                  width: 'auto',
                  fontSize: 16, textAlign: 'center',
                  padding: '1px 8px',
                  display: 'inline-block',
                  marginLeft: 12,
                  borderRadius: 6,
                  color: '#fff',
                  fontWeight: 500
                })}>Beta</Text>
              </Center>
            </MediaQuery>
          </Group>
          <Group position="right">
            <TextInput
              placeholder="search anything"
              variant="filled"
              radius="md"
              icon={(searching) ? <Loader size="xs" /> : <Search size={14} color={"#fff"} />} style={{ width: 240 }}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyUp={(event) => search(event)}
            />
          </Group>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={1200} styles={{ display: 'none' }}>
        <Group position="apart" grow>
          <Group position="left">
            <Center>
              <a href="/">
                <Image alt="logo" src={dark ? "/assets/images/logo_h_white.svg" : "/assets/images/logo_h_dark.svg"} style={{ marginLeft: 25 }} height={30} />
              </a>

              <Text sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
                width: 'auto',
                fontSize: 16, textAlign: 'center',
                padding: '1px 8px',
                marginLeft: 12,
                display: 'inline-block',
                borderRadius: 6,
                color: '#fff',
                fontWeight: 500
              })}>Beta</Text>
            </Center>
            <Group position='left' style={{ paddingLeft: 10 }}>
              <Button variant="subtle" color="gray" size="md" compact component={Link} to="/">Explore</Button>
              <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://incognito.org/apps">About us</Button>
              <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://we.incognito.org/">Community</Button>
            </Group>
          </Group>


          <Group position="right">
            <TextInput
              placeholder="search anything"
              variant="filled"
              radius="md"
              icon={(searching) ? <Loader size="xs" /> : <Search size={14} color={"#fff"} />} style={{ width: 280, backgroundColor: '#303030', borderRadius: 12 }}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyUp={(event) => search(event)}
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