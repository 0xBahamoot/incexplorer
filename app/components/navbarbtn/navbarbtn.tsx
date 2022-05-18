import { Box } from '@mantine/core';
import React, { FunctionComponent } from 'react'

import { Link } from 'react-router-dom';


type Props = {
    text: string
    link: string
}

const NavbarBtn: FunctionComponent<Props> = ({ text, link }) => {

    return (
        <>
            <Box
                component={Link} to={link}
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
                    textDecoration: 'none',
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