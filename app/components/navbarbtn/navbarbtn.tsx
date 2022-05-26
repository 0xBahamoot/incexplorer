import { Box } from '@mantine/core';
import React, { FunctionComponent } from 'react'

import { useNavigate } from 'react-router-dom';


type Props = {
    text: string
    link: string
    external?: boolean
}

const NavbarBtn: FunctionComponent<Props> = ({ text, link, external }) => {

    let navigate = useNavigate();

    return (
        <>
            <Box
                onClick={() => {
                    if (external) {
                        window.open(link, '_blank');
                    } else {
                        navigate(link, { replace: true });
                    }
                }}
                sx={(theme) => ({
                    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    textAlign: 'left',
                    padding: theme.spacing.sm,
                    borderRadius: 8,
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                    paddingLeft: 55,
                    color: theme.colorScheme === 'dark' ? '#757575' : '#000',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    height: 40,
                    lineHeight: '16px',
                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[1],
                        color: theme.colorScheme === 'dark' ? '#fff' : '#000',
                    },
                })}
            >
                {text}
            </Box>
        </>

    );
}

export default NavbarBtn;