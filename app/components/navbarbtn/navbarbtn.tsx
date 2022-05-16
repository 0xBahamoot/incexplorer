import { Box } from '@mantine/core';
import React, { FunctionComponent } from 'react'


type Props = {
    text: string
}

const NavbarBtn: FunctionComponent<Props> = ({ text }) => {

    return (
        <>
            <Box
                sx={(theme) => ({
                    height: 'auto',
                    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    textAlign: 'left',
                    padding: theme.spacing.sm,
                    borderRadius: 8,
                    fontWeight: 'bold',
                    paddingLeft: 30,
                    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
                    cursor: 'pointer',

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                    },
                })}
            >
                {text}
            </Box>
        </>

    );
}

export default NavbarBtn;