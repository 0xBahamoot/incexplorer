import Home from "./home/index";

function Index() {
  return <><Home /></>
}
// function Index() {
//   const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
//     key: 'mantine-color-scheme',
//     defaultValue: 'light',
//     getInitialValueInEffect: true,
//   });

//   const toggleColorScheme = (value?: ColorScheme) =>
//     setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

//   useHotkeys([['mod+J', () => toggleColorScheme()]]);

//   return (
//     <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
//     <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
//     <AppShell
//       padding="md"
//       header={<Header height={60} p="xs">{<MainHeader />}</Header>}
//       styles={(theme) => ({
//         main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
//       })}
//     >
//        <Outlet />
//     </AppShell>
//     </MantineProvider>
//     </ColorSchemeProvider>
//   );
// }

export default Index;