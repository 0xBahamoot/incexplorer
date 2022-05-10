import { ActionIcon, useMantineColorScheme ,Group,Button,TextInput,Image} from '@mantine/core';
import { Sun, MoonStars,Search } from 'tabler-icons-react';
function MainHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
     <Group position="apart" grow>

     <Group position="left">
     <Image src="/logo.png" alt="it's me"  style={{filter: dark? "invert(100%)":""}} height={30}/>
      <Button  variant="light" size="md" compact>Home</Button>
      <Button  variant="subtle" color="dark" size="md" compact>pTokens</Button>
      {/* <Button  variant="subtle" color="dark" size="md" compact>Shield</Button> */}
      <Button  variant="subtle" color="dark" size="md" compact>Community</Button>
    </Group>
      <Group position="center">
    </Group>
      <Group position="right">
      <TextInput
      placeholder="search transaction or block hash"
      variant="filled"
      radius="md"
      icon={<Search size={14} />} style={{ width: 400 }}
    />
      <ActionIcon
      variant="light"
      size="lg" 
      radius="md"
      // color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={24} /> : <MoonStars size={24} />}
    </ActionIcon>
    </Group>
    </Group>
    </>
    
  );
}

export default MainHeader;