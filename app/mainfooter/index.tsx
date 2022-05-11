import { ActionIcon, useMantineColorScheme ,Group,Button,TextInput,Image,Center,Divider, Title} from '@mantine/core';
import { Sun, MoonStars,Search,ChevronDown } from 'tabler-icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Popover, Badge, Text } from '@mantine/core';

function MainFooter() {
  const [subMenuBC, setSubMenuBC] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
     <Group position="apart" grow>
     <Group position="left">
     <Center style={{ width: 150, height: 60 }}>
       <Title order={5}>© 2022 Incognito</Title>
      </Center>
    </Group>
    </Group>
    </>
    
  );
}

export default MainFooter;