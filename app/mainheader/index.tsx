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
  Stack,
  Box,
  Title,
  Dialog,
  Modal,
  Card,
  Avatar,
  Badge,
} from "@mantine/core";
import { Sun, MoonStars, Search, X, CircleCheck } from "tabler-icons-react";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useFetcher } from "@remix-run/react";
import { showNotification } from "@mantine/notifications";
import { NotificationsProvider } from "@mantine/notifications";
import NavDrawer from "~/components/navdrawer/navdrawer";
import useStyles from "./styles";
import { TokenInfo } from "~/types/types";
import { getTokenIcon } from "~/services/icons";

// import { useLocation } from 'react-router-dom';
function MainHeader() {
  // let location = useLocation();
  const [openedSearchResult, setOpenedSearchResult] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const fetcher = useFetcher();
  const theme = useMantineTheme();
  const { classes } = useStyles();
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
      fetcher.load(`/search/${searchValue}`);
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

      if (result.TokenID) {
        navigate(`/token/${searchValue}`, { replace: true });
        return;
      }

      if (typeof result !== "string" && result.length > 0) {
        console.log(result);
        setSearchResultList(result);
        setOpenedSearchResult(true);
        return;
      }

      showNotification({
        autoClose: 5000,
        title: "Search result",
        message: "nothing was found!",
        color: "red",
        radius: "md",
      });
    }
  }, [fetcher.data]);

  return (
    <>
      <Modal
        opened={openedSearchResult}
        onClose={() => setOpenedSearchResult(false)}
        withCloseButton={false}
        overlayOpacity={0.55}
        overlayBlur={3}
        overflow="inside"
        title={
          <Title data-autofocus order={4} style={{ color: "#fff" }}>
            Search result for "{searchValue}"
          </Title>
        }
      >
        <ActionIcon
          size={16}
          radius="xl"
          variant="transparent"
          onClick={() => {
            setOpenedSearchResult(false);
          }}
          style={{
            position: "absolute",
            top: 25,
            right: 20,
          }}
        >
          <Image src="/assets/images/icons/cancel.svg" color={"#fff"} />
        </ActionIcon>

        {searchResultList.map((element: TokenInfo, idx: number) => (
          <Card
            key={idx}
            style={{
              marginBottom: 10,
              backgroundColor: "#303030",
              cursor: "pointer",
              padding: "10px 15px",
            }}
            radius="md"
            component={Link}
            to={"/token/" + element.TokenID}
            onClick={() => {
              setOpenedSearchResult(false);
            }}
          >
            <Center inline style={{ minHeight: 50, maxHeight: 70 }}>
              <Avatar
                size={32}
                src={getTokenIcon(element.Symbol)}
                style={{ zIndex: 1, borderRadius: "100%" }}
              />
              <Box ml={5} style={{ paddingLeft: 5, whiteSpace: "nowrap" }}>
                <Text style={{ fontSize: 16, fontWeight: 400, color: "#fff" }}>
                  {/* <Badge
                    color="green"
                    variant="filled"
                    style={{
                      textTransform: "none",
                      fontSize: 10,
                      fontWeight: 500,
                      marginTop: 5,
                      width: 20,
                    }}
                    p={6}
                    leftSection={
                      <Check
                        size={14}
                        strokeWidth={2}
                        color={"white"}
                        style={{ marginTop: 5, marginLeft: 5 }}
                      />
                    }
                    hidden={!element.Verified}
                  ></Badge> */}
                  {element.Name}{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#757575",
                    lineHeight: "14px",
                  }}
                >
                  {element.Network}
                </Text>
                <Badge
                  color="green"
                  variant="filled"
                  style={{
                    textTransform: "none",
                    fontSize: 10,
                    fontWeight: 500,
                    marginTop: 5,
                  }}
                  p={6}
                  leftSection={
                    <CircleCheck
                      size={14}
                      strokeWidth={2}
                      color={"white"}
                      style={{ marginTop: 5 }}
                    />
                  }
                  hidden={!element.Verified}
                >
                  Verified
                </Badge>
              </Box>
            </Center>
          </Card>
        ))}
      </Modal>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding={0}
        size="xl"
        withCloseButton={false}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Box style={{ paddingLeft: 16, borderBottom: "1px solid #363636" }}>
            <Group position="apart" style={{ height: 64 }}>
              <Center>
                <a href="/">
                  <Image
                    alt="logo"
                    fit="contain"
                    src={
                      dark
                        ? "/assets/images/logo_mobile2.svg"
                        : "/assets/images/logo_mobile2.svg"
                    }
                    height={42}
                    width={"auto"}
                  />
                </a>
              </Center>
              <Group position="right">
                <ActionIcon
                  size={22}
                  radius="xl"
                  variant="transparent"
                  onClick={() => {
                    setOpened(false);
                  }}
                  style={{
                    marginTop: -2,
                    marginRight: 15,
                    padding: 2,
                  }}
                >
                  <Image
                    src="/assets/images/icons/cancel.svg"
                    color={"#757575"}
                  />
                </ActionIcon>
              </Group>
            </Group>
          </Box>
          <NavDrawer onNav={() => setOpened(false)} />
          <Box style={{ paddingLeft: 16, paddingBottom: 10 }}>
            <Group position="left">
              <Button
                variant="subtle"
                color="gray"
                className={classes.btn}
                size="md"
                compact
                component="a"
                target={"_blank"}
                href="https://incognito.org/mediakit"
              >
                Media kit
              </Button>
              <Button
                variant="subtle"
                color="gray"
                className={classes.btn}
                size="md"
                compact
                component="a"
                target={"_blank"}
                href="https://t.me/incognitochain"
              >
                Telegram
              </Button>
              <Button
                variant="subtle"
                color="gray"
                className={classes.btn}
                size="md"
                compact
                component="a"
                target={"_blank"}
                href="https://twitter.com/IncognitoChain"
              >
                Twitter
              </Button>
            </Group>
            <Group position="left">
              <Center style={{ width: 150, height: 50 }}>
                <Title order={5} style={{ color: "#fff", fontWeight: 500 }}>
                  © 2022 Incognito
                </Title>
              </Center>
            </Group>
          </Box>
        </Stack>
      </Drawer>

      <NotificationsProvider
        position="top-right"
        zIndex={2077}
      ></NotificationsProvider>

      <Dialog
        transition="slide-down"
        opened={showSearch}
        onClose={() => setShowSearch(false)}
        position={{ top: 64, left: 0, right: 0 }}
        // size={'100%'}
        zIndex={1}
        styles={{
          root: {
            backgroundColor: "#1A1A1A",
            border: "none",
            boxShadow: "none",
            width: "100%",
          },
        }}
      >
        <TextInput
          placeholder="Search anything..."
          variant="filled"
          radius="md"
          iconWidth={40}
          icon={
            fetcher.state !== "idle" ? (
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
              width: "100%",
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
      </Dialog>

      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <Group position="apart" style={{ height: 42, padding: "0 16px" }}>
          <Group position="left">
            <ActionIcon
              size={22}
              // radius="xl"
              variant="transparent"
              onClick={() => {
                setShowSearch(false);
              }}
              style={{
                display: showSearch ? "block" : "none",
                marginTop: -2,
                padding: 2,
              }}
            >
              <Image src="/assets/images/icons/cancel.svg" color={"#757575"} />
            </ActionIcon>
            <ActionIcon
              size="sm"
              radius="xl"
              variant="transparent"
              onClick={() => {
                setShowSearch(true);
              }}
              style={{ display: showSearch ? "none" : "block", marginTop: -2 }}
            >
              <Image src="/assets/images/icons/search.svg" color={"#fff"} />
            </ActionIcon>
          </Group>
          <Center>
            <a href="/">
              <Image
                alt="logo"
                fit="contain"
                src={
                  dark
                    ? "/assets/images/logo_mobile.svg"
                    : "/assets/images/logo_mobile.svg"
                }
                height={42}
                width={"auto"}
              />
            </a>
          </Center>
          <Group position="right">
            <ActionIcon
              size="sm"
              radius="xl"
              variant="transparent"
              onClick={() => setOpened((o) => !o)}
            >
              <Image src="/assets/images/icons/burger.svg" color={"#fff"} />
            </ActionIcon>
          </Group>
        </Group>
      </MediaQuery>

      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <Group position="apart" grow style={{ height: 42, padding: "0 30px" }}>
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
                fetcher.state !== "idle" ? (
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
