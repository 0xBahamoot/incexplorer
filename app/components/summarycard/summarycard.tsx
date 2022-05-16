import { Paper, Text } from '@mantine/core';
import React, { FunctionComponent } from 'react'
import useStyles from './styles'
import format from '~/utils/format';
type Props = {
    title: string,
    content: number,
    subtext: string,
    currencyFormat: boolean,
    type: number,
}

const SummaryCard: FunctionComponent<Props> = ({ title, content, currencyFormat, type, subtext }) => {
    const { classes } = useStyles();
    return (
        <>
            <Paper shadow="sm" radius="md" p="xl" withBorder className={classes.paper}>
                <p className={classes.title}>{title.toLowerCase()}</p>
                <Text className={classes.content}>{currencyFormat ? "$" : ""}{format.formatAmount({ humanAmount: content, decimals: 4 })}</Text>
                {/* <Text size="sm">{subtext}</Text> */}
            </Paper>
        </>

    );
}

export default SummaryCard;
