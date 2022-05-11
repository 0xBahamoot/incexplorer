import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { AppShell, Header, Footer,Container } from '@mantine/core';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import MainHeader from '~/mainheader';
import { Outlet } from "@remix-run/react";
import MainFooter from "./mainfooter";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Incognito Explorer",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [contentHeight, setContentHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [fixedFooter, setFixedFooter] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  function checkHeight() {
    setBodyHeight(window.innerHeight - 120)
    if (window.innerHeight - 120 > contentHeight) {
      setFixedFooter(true);
    } else {
      setFixedFooter(false);
    }
  }
  useEffect(() => {
    checkHeight()
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <AppShell
              padding="md"
              style={{ paddingTop: '60px' }}
              header={<Header fixed={true} height={60} p="xs">{<MainHeader />}</Header>}
              footer={<Footer height={60} p={0} fixed={fixedFooter}>{<MainFooter />} </Footer>}
            styles={(theme) => ({
              main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : "#fff",height: bodyHeight },
            })}
            >
            <Container size='xl' px={0}>
              <div ref={(divElement) => { checkHeight(); setContentHeight((divElement)?divElement?.clientHeight:0) }}><Outlet /></div>
</Container>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
