import {
  ActionIcon,
  useMantineColorScheme,
  Group,
  Button,
  TextInput,
  Image,
  Text,
  Center,
  MediaQuery,
  Burger,
  Drawer,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { Sun, MoonStars, Search } from "tabler-icons-react";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import MainNavbar from "~/mainnavbar";
import { useFetcher } from "@remix-run/react";
import { showNotification } from "@mantine/notifications";
import { NotificationsProvider } from "@mantine/notifications";
import NavDrawer from "~/components/navdrawer/navdrawer";

// import { useLocation } from 'react-router-dom';

function MainHeader() {
  // let location = useLocation();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const fetcher = useFetcher();
  const theme = useMantineTheme();
  const dark = colorScheme === "dark";
  let navigate = useNavigate();

  const [chainNetwork, setChainNetwork] = useLocalStorage({
    key: "chainnetwork",
    defaultValue: "mainnet",
    getInitialValueInEffect: true,
  });

  function switchNetwork(network: string) {
    setChainNetwork(network);
    window.location.reload();
  }

  function search(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && searchValue.length > 0) {
      setSearching(true);
      fetcher.load(`/search/${searchValue}`);
      setSearching(false);
    }
  }

  useEffect(() => {
    const result = fetcher.data;
    if (result) {
      console.log("result", result);
      if (result.IsBeaconBlock) {
        navigate(`/block/${searchValue}?beacon=true`, { replace: true });
        return;
      }

      if (result.IsBlock) {
        navigate(`/block/${searchValue}`, { replace: true });
        return;
      }

      if (result.IsTransaction) {
        navigate(`/tx/${searchValue}`, { replace: true });
        return;
      }

      showNotification({
        autoClose: 5000,
        title: "Search result",
        message: "Hash not found!",
        color: "red",
        radius: "md",
      });
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
        padding={0}
        size="xl"
      >
        <NavDrawer />
      </Drawer>

      <NotificationsProvider
        position="top-right"
        zIndex={2077}
      ></NotificationsProvider>
      <MediaQuery largerThan={1024} styles={{ display: "none" }}>
        <Group position="apart" style={{ height: 42 }}>
          <Group position="left">
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={"#fff"}
            />
          </Group>
          <Center>
            <a href="/">
              <Image
                alt="logo"
                fit="contain"
                src={
                  dark
                    ? "/assets/images/logo_h_white.svg"
                    : "/assets/images/logo_h_white.svg"
                }
                height={24}
                width={"auto"}
              />
            </a>
          </Center>
          <Group position="right">
            <ActionIcon size="xl" radius="xl" variant="transparent">
              <Search />
            </ActionIcon>
          </Group>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={1024} styles={{ display: "none" }}>
        <Group position="apart" grow style={{ height: 42 }}>
          <Group position="left">
            <Center>
              <a href="/">
                <Image
                  alt="logo"
                  fit="contain"
                  src={
                    dark ? "/assets/images/logo.svg" : "/assets/images/logo.svg"
                  }
                  height={38}
                />
              </a>

              <Text
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? "#303030"
                      : theme.colors.gray[0],
                  width: "auto",
                  fontSize: 14,
                  textAlign: "center",
                  padding: "2px 8px",
                  marginLeft: 12,
                  marginTop: -15,
                  display: "inline-block",
                  borderRadius: 6,
                  color: "#fff",
                  fontWeight: 500,
                })}
              >
                Beta
              </Text>
            </Center>
          </Group>

          <Group position="right">
            <TextInput
              placeholder="Search anything..."
              variant="filled"
              radius="md"
              iconWidth={40}
              icon={
                searching ? (
                  <Loader size="xs" style={{ marginLeft: 8 }} />
                ) : (
                  <Image
                    src="/assets/images/icons/search.svg"
                    color={"#fff"}
                    style={{ marginLeft: 8 }}
                  />
                )
              }
              styles={{
                input: {
                  width: 280,
                  color: "#fff",
                  height: 40,
                  fontSize: 16,
                  backgroundColor: "#303030",
                  paddingTop: 0,
                },
              }}
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
