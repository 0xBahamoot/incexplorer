import { Box, Text } from '@mantine/core';

import React, { FunctionComponent } from 'react'


type Props = {
    tokenid: string
}

const TokenPriceChip: FunctionComponent<Props> = ({ tokenid }) => {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                fontSize: 12,
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
            })}
        >
            Prv: $0,7 <Text style={{ fontSize: 12, display: "inline-block", color: "red" }}>(-15%)</Text>
        </Box>
    );
}

export default TokenPriceChip;