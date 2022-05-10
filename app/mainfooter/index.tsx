import { ActionIcon, useMantineColorScheme ,Group,Button,TextInput,Image,Stack,Divider} from '@mantine/core';
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
     <Image src="/logo.png" alt="it's me"  style={{filter: dark? "invert(100%)":""}} height={30}/>
    </Group>
    </Group>
    </>
    
  );
}

export default MainFooter;