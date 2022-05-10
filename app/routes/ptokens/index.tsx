import { ActionIcon,Group,Button,TextInput,Image} from '@mantine/core';
import { Sun, MoonStars,Search } from 'tabler-icons-react';
function PTokens() {

  return (
    <>
     <Group position="apart" grow>

     <Group position="left">
   
      <Button  variant="light" size="md" compact>Home</Button>
      <Button  variant="subtle" color="dark" size="md" compact>pTokens</Button>
      <Button  variant="subtle" color="dark" size="md" compact>Shield</Button>
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

    </Group>
    </Group>
    </>
    
  );
}

export default PTokens;