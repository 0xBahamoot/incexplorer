import { ActionIcon, useMantineColorScheme, Group, Button, TextInput, Image, Text, Center, MediaQuery, Burger, Drawer, useMantineTheme, Loader } from '@mantine/core';
import { Sun, MoonStars, Search } from 'tabler-icons-react';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import MainNavbar from '~/mainnavbar';
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
      setSearching(false)
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
        padding="xl"
        size="xl"
      >
        <MainNavbar />
      </Drawer>

      <NotificationsProvider position="top-right" zIndex={2077}>
      </NotificationsProvider>
      <MediaQuery largerThan={1200} styles={{ display: 'none' }}>
        <Group position="apart" style={{ height: 52 }}>
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
                  <Image alt="logo" src={dark ? "/assets/images/logo.svg" : "/assets/images/logo.svg"} height={44} />
                </a>

                <Text sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
                  width: 'auto',
                  fontSize: 14, textAlign: 'center',
                  padding: '2px 8px',
                  display: 'inline-block',
                  marginLeft: 12,
                  marginTop: -15,
                  borderRadius: 6,
                  color: '#fff',
                  fontWeight: 500
                })}>Beta</Text>
              </Center>
            </MediaQuery>
          </Group>
          <Group position="right">
            <Center>
              <TextInput
                placeholder="Search anything..."
                variant="filled"
                radius="md"
                iconWidth={40}
                icon={(searching) ? <Loader size="xs" style={{ marginLeft: 8 }} /> : <Image src='/assets/images/icons/search.svg' color={"#fff"} style={{ marginLeft: 8 }} />}
                styles={{ input: { width: 280, color: '#fff', height: 40, fontSize: 16, backgroundColor: '#303030', paddingTop: 0 } }}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyUp={(event) => search(event)}
                height={40}
              />
            </Center>
          </Group>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={1200} styles={{ display: 'none' }}>
        <Group position="apart" grow style={{ height: 42 }}>
          <Group position="left">
            <Center>
              <a href="/">
                <Image alt="logo" src={dark ? "/assets/images/logo.svg" : "/assets/images/logo.svg"} height={38} />
              </a>

              <Text sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[0],
                width: 'auto',
                fontSize: 14, textAlign: 'center',
                padding: '2px 8px',
                marginLeft: 12,
                marginTop: -15,
                display: 'inline-block',
                borderRadius: 6,
                color: '#fff',
                fontWeight: 500
              })}>Beta</Text>
            </Center>
            {/* <Group position='left' style={{ paddingLeft: 30 }}>
              <Button variant="subtle" color="gray" size="md" compact component={Link} to="/">Explore</Button>
              <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://incognito.org">About us</Button>
              <Button variant="subtle" color="gray" size="md" compact component="a" target={"_blank"} href="https://we.incognito.org/">Community</Button>
            </Group> */}
          </Group>


          <Group position="right">
            <TextInput
              placeholder="Search anything..."
              variant="filled"
              radius="md"
              iconWidth={40}
              icon={(searching) ? <Loader size="xs" style={{ marginLeft: 8 }} /> : <Image src='/assets/images/icons/search.svg' color={"#fff"} style={{ marginLeft: 8 }} />}
              styles={{ input: { width: 280, color: '#fff', height: 40, fontSize: 16, backgroundColor: '#303030', paddingTop: 0 } }}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyUp={(event) => search(event)}
              height={40}
            />
          </Group>
        </Group>
      </MediaQuery>
    </>

  );
}

export default MainHeader;