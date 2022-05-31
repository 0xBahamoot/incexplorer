import { Navbar, useMantineColorScheme, Stack, Button, Accordion, Group, Avatar, Text } from '@mantine/core';
import { useState } from 'react';
import NavbarBtn from '~/components/navbarbtn/navbarbtn';
import { ChevronDown } from 'tabler-icons-react';
import { accordionLabelStyle } from './styles';

import { useNavigate } from 'react-router-dom';

interface AccordionLabelProps {
    label: string;
    icon: string;
    style?: any;
}

function AccordionLabel({ label, icon, style }: AccordionLabelProps) {
    return (
        <Group noWrap style={style}>
            <Avatar src={icon} radius="xl" size="md" />
            <div>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>{label}</Text>
            </div>
        </Group>
    );
}


function BlockChainSection() {
    return (
        <>
            <Stack justify="flex-start" spacing="xs">
                <NavbarBtn text='Overview' link='/chain'></NavbarBtn>
                <NavbarBtn text='Beacon chain' link='/chain/beacon'></NavbarBtn>
                <NavbarBtn text='Shards chain' link='/chain/shards'></NavbarBtn>
                <NavbarBtn text='Transactions' link='/txs'></NavbarBtn>
                <NavbarBtn text='Pending txs' link='/pendingtxs'></NavbarBtn>
            </Stack>
        </>
    )
}

function ExchangeSection() {
    return (
        <>
            <Stack justify="flex-start" spacing="xs">
                <NavbarBtn text='Markets' link='/charts/market'></NavbarBtn>
                <NavbarBtn text='Liquidity' link='/'></NavbarBtn>
            </Stack>
        </>
    )
}

function ShieldedSection() {
    return (
        <>
            <Stack justify="flex-start" spacing="xs">
                {/* <NavbarBtn text='TVL' link='/charts/liquiditytvl'></NavbarBtn> */}
                {/* <NavbarBtn text='Shield Volume' link='/charts/shieldvolume'></NavbarBtn> */}
                <NavbarBtn text='Shield Txs' link='/shieldtxs'></NavbarBtn>
            </Stack>
        </>
    )
}

function NetworkSection() {
    return (
        <>
            <Stack justify="flex-start" spacing="xs">
                <NavbarBtn text='Validators' link='/validators'></NavbarBtn>
            </Stack>
        </>
    )
}

function GetStartedSection() {
    return (
        <>
            <Stack justify="flex-start" spacing="xs">
                <NavbarBtn text='Download' link='https://incognito.org/' external></NavbarBtn>
            </Stack>
        </>
    )
}
function MainNavbar() {

    let navigate = useNavigate();
    const { classes } = accordionLabelStyle();
    return (
        <>
            <Navbar.Section>
                {/* <Accordion.Item styles={{ control: { paddingLeft: 5 } }} iconSize={0} label={<AccordionLabel label='Home' icon='/assets/images/icons/navbar-blockchain.svg' />} classNames={classes} onClick={() => {
                    navigate(`/`, { replace: true });
                }}>
                </Accordion.Item> */}
                <Accordion iconPosition="right" multiple icon={<ChevronDown size={18} strokeWidth={3} />}>
                    <Accordion.Item label={<AccordionLabel label='Blockchain' icon='/assets/images/icons/navbar-blockchain.svg' />} classNames={classes}>
                        <BlockChainSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Privacy Exchange' icon='/assets/images/icons/navbar-exchange.svg' />} classNames={classes}>
                        <ExchangeSection />
                    </Accordion.Item>

                    <Accordion.Item label={<AccordionLabel label='Shielded coins' icon='/assets/images/icons/navbar-shielded.svg' />} classNames={classes}>
                        <ShieldedSection />
                    </Accordion.Item>

                    {/* <Accordion.Item label={<AccordionLabel label='Network' icon='/assets/images/icons/navbar-network.svg' />} classNames={classes}>
                        <NetworkSection />
                    </Accordion.Item> */}
                    {/* 
                    <Accordion.Item label={<AccordionLabel label='Get started' icon='/assets/images/icons/navbar-getstarted.svg' />} classNames={classes}>
                        <GetStartedSection />
                    </Accordion.Item> */}

                </Accordion>

                {/* <Accordion.Item styles={{ control: { paddingLeft: 5 } }} iconSize={0} label={<AccordionLabel label='Community' icon='/assets/images/icons/navbar-blockchain.svg' />} classNames={classes} onClick={() => {
                    window.open('https://we.incognito.org/', '_blank');
                }}>
                </Accordion.Item>
                <Accordion.Item styles={{ control: { paddingLeft: 5 } }} iconSize={0} label={<AccordionLabel label='About us' icon='/assets/images/icons/navbar-blockchain.svg' />} classNames={classes} onClick={() => {
                    window.open('https://incognito.org', '_blank');
                }}>
                </Accordion.Item> */}


            </Navbar.Section>
        </>

    );
}

export default MainNavbar;