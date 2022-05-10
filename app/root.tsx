import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { AppShell, Header } from '@mantine/core';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import MainHeader from '~/mainheader';
import { Outlet } from "@remix-run/react";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Incognito Explorer",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

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
              header={<Header height={60} p="xs">{<MainHeader />}</Header>}
              // styles={(theme) => ({
              //   main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "#fff" },
              // })}
            >
              <Outlet />
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
