import {
  Navbar,
  useMantineColorScheme,
  Stack,
  ScrollArea,
  Accordion,
  Group,
  Avatar,
  Text,
  Space,
  MediaQuery,
} from "@mantine/core";
import { FunctionComponent, useState } from "react";
import NavbarBtn from "~/components/navbarbtn/navbarbtn";
import { ChevronDown } from "tabler-icons-react";
import { accordionLabelStyle } from "./styles";

import { useNavigate } from "react-router-dom";

interface AccordionLabelProps {
  label: string;
  icon: string;
  style?: any;
  fontSize?: number;
}

function AccordionLabel({ label, icon, style, fontSize }: AccordionLabelProps) {
  return (
    <Group noWrap style={style}>
      <Avatar src={icon} radius="xl" size={30} />
      <div>
        <Text style={{ fontSize: fontSize ? fontSize : 16, fontWeight: 500 }}>
          {label}
        </Text>
      </div>
    </Group>
  );
}

function BlockChainSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        <NavbarBtn
          text="Overview"
          link="/chain"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Beacon chain"
          link="/chain/beacon"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Shards chain"
          link="/chain/shards"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Transactions"
          link="/txs"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Pending txs"
          link="/pendingtxs"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Tokens"
          link="/pdex/tokens"
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}

function ExchangeSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        <NavbarBtn
          text="Trades"
          link="/pdex/trades"
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Tokens"
          link="/pdex/tokens"
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}

function ShieldedSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        {/* <NavbarBtn text='TVL' link='/charts/liquiditytvl'fontSize={fontSize}></NavbarBtn> */}
        {/* <NavbarBtn text='Shield Volume' link='/charts/shieldvolume'fontSize={fontSize}></NavbarBtn> */}
        <NavbarBtn
          text="Shield Txs"
          link="/shieldtxs"
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}

function NetworkSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        <NavbarBtn
          text="Validators"
          link="/validators"
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}

function GetStartedSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        <NavbarBtn
          text="Download"
          link="https://incognito.org/"
          external
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}

function AboutUsSection(onNav?: () => void, fontSize?: number) {
  return (
    <>
      <Stack
        justify="flex-start"
        spacing="xs"
        onClick={() => {
          if (onNav) {
            onNav();
          }
        }}
      >
        <NavbarBtn
          text="Utilities"
          link="https://incognito.org/"
          external
          fontSize={fontSize}
        ></NavbarBtn>
        <NavbarBtn
          text="Community"
          link="https://we.incognito.org/"
          external
          fontSize={fontSize}
        ></NavbarBtn>
      </Stack>
    </>
  );
}
type Props = {
  onNav?: () => void;
};

const MainNavbar: FunctionComponent<Props> = ({ onNav }) => {
  let navigate = useNavigate();
  const { classes } = accordionLabelStyle();
  return (
    <>
      <MediaQuery largerThan={1200} styles={{ display: "none" }}>
        <Navbar.Section p={0} grow component={ScrollArea}>
          {" "}
          <Space h={16} />
          <Accordion.Item
            styles={{ control: { paddingLeft: 0, borderRadius: 0 } }}
            iconSize={0}
            label={
              <AccordionLabel
                label="Home"
                icon="/assets/images/icons/navbar-home.svg"
                fontSize={20}
              />
            }
            classNames={{
              item: classes.item,
              itemOpened: classes.itemOpened,
              control: classes.controlMobile,
              icon: classes.icon,
            }}
            onClick={() => {
              if (onNav) {
                onNav();
              }
              navigate(`/`, { replace: true });
            }}
          ></Accordion.Item>
          <Accordion
            iconPosition="right"
            multiple
            icon={<ChevronDown size={18} strokeWidth={3} />}
          >
            <Accordion.Item
              label={
                <AccordionLabel
                  label="Blockchain"
                  icon="/assets/images/icons/navbar-blockchain.svg"
                  fontSize={20}
                />
              }
              classNames={{
                item: classes.item,
                itemOpened: classes.itemOpened,
                control: classes.controlMobile,
                icon: classes.icon,
              }}
            >
              {BlockChainSection(onNav, 20)}
            </Accordion.Item>

            {/* <Accordion.Item
              label={
                <AccordionLabel
                  label="Privacy Exchange"
                  icon="/assets/images/icons/navbar-exchange.svg"
                  fontSize={20}
                />
              }
              classNames={{
                item: classes.item,
                itemOpened: classes.itemOpened,
                control: classes.controlMobile,
                icon: classes.icon,
              }}
            >
              {ExchangeSection(onNav, 20)}
            </Accordion.Item> */}

            <Accordion.Item
              label={
                <AccordionLabel
                  label="Shielded coins"
                  icon="/assets/images/icons/navbar-shielded.svg"
                  fontSize={20}
                />
              }
              classNames={{
                item: classes.item,
                itemOpened: classes.itemOpened,
                control: classes.controlMobile,
                icon: classes.icon,
              }}
            >
              {ShieldedSection(onNav, 20)}
            </Accordion.Item>

            {/* <Accordion.Item label={<AccordionLabel label='Network' icon='/assets/images/icons/navbar-network.svg' />}
            className={classes.sectionBtn}>
                        <NetworkSection />
                    </Accordion.Item> */}
            {/* 
                    <Accordion.Item label={<AccordionLabel label='Get started' icon='/assets/images/icons/navbar-getstarted.svg' />}
            className={classes.sectionBtn}>
                        <GetStartedSection />
                    </Accordion.Item> */}
            <Accordion.Item
              label={
                <AccordionLabel
                  label="About us"
                  icon="/assets/images/icons/navbar-aboutus.svg"
                  fontSize={20}
                />
              }
              classNames={{
                item: classes.item,
                itemOpened: classes.itemOpened,
                control: classes.controlMobile,
                icon: classes.icon,
              }}
            >
              {AboutUsSection(onNav, 20)}
            </Accordion.Item>
          </Accordion>
          {/* <Accordion.Item styles={{ control: { paddingLeft: 5 } }} iconSize={0} label={<AccordionLabel label='Community' icon='/assets/images/icons/navbar-blockchain.svg' />}
            className={classes.sectionBtn} onClick={() => {
                    window.open('https://we.incognito.org/', '_blank');
                }}>
                </Accordion.Item> */}
          {/* <Accordion.Item styles={{ control: { paddingLeft: 0 } }} iconSize={0} label={<AccordionLabel label='About us' icon='/assets/images/icons/navbar-aboutus.svg' />}
            className={classes.sectionBtn} onClick={() => {
                    window.open('https://incognito.org', '_blank');
                }}>
                </Accordion.Item> */}
          <Space h={16} />
        </Navbar.Section>
      </MediaQuery>
      <MediaQuery smallerThan={1200} styles={{ display: "none" }}>
        <Navbar.Section p={"0 16px"} grow component={ScrollArea}>
          <Space h={16} />
          <Accordion.Item
            styles={{ control: { paddingLeft: 0 } }}
            iconSize={0}
            label={
              <AccordionLabel
                label="Home"
                icon="/assets/images/icons/navbar-home.svg"
              />
            }
            classNames={classes}
            onClick={() => {
              navigate(`/`, { replace: true });
            }}
          ></Accordion.Item>
          <Accordion
            iconPosition="right"
            multiple
            icon={<ChevronDown size={18} strokeWidth={3} />}
          >
            <Accordion.Item
              label={
                <AccordionLabel
                  label="Blockchain"
                  icon="/assets/images/icons/navbar-blockchain.svg"
                />
              }
              classNames={classes}
            >
              {BlockChainSection()}
            </Accordion.Item>

            {/* <Accordion.Item
              label={
                <AccordionLabel
                  label="Privacy Exchange"
                  icon="/assets/images/icons/navbar-exchange.svg"
                />
              }
              classNames={classes}
            >
              {ExchangeSection(onNav)}
            </Accordion.Item> */}

            <Accordion.Item
              label={
                <AccordionLabel
                  label="Shielded coins"
                  icon="/assets/images/icons/navbar-shielded.svg"
                />
              }
              classNames={classes}
            >
              {ShieldedSection()}
            </Accordion.Item>

            {/* <Accordion.Item label={<AccordionLabel label='Network' icon='/assets/images/icons/navbar-network.svg' />}
            classNames={classes}>
                        <NetworkSection />
                    </Accordion.Item> */}
            {/* 
                    <Accordion.Item label={<AccordionLabel label='Get started' icon='/assets/images/icons/navbar-getstarted.svg' />}
            classNames={classes}>
                        <GetStartedSection />
                    </Accordion.Item> */}
            <Accordion.Item
              label={
                <AccordionLabel
                  label="About us"
                  icon="/assets/images/icons/navbar-aboutus.svg"
                />
              }
              classNames={classes}
            >
              {AboutUsSection()}
            </Accordion.Item>
          </Accordion>

          {/* <Accordion.Item styles={{ control: { paddingLeft: 5 } }} iconSize={0} label={<AccordionLabel label='Community' icon='/assets/images/icons/navbar-blockchain.svg' />}
            classNames={classes} onClick={() => {
                    window.open('https://we.incognito.org/', '_blank');
                }}>
                </Accordion.Item> */}
          {/* <Accordion.Item styles={{ control: { paddingLeft: 0 } }} iconSize={0} label={<AccordionLabel label='About us' icon='/assets/images/icons/navbar-aboutus.svg' />}
            classNames={classes} onClick={() => {
                    window.open('https://incognito.org', '_blank');
                }}>
                </Accordion.Item> */}

          <Space h={16} />
        </Navbar.Section>
      </MediaQuery>
    </>
  );
};

export default MainNavbar;
