import { Paper, Text, ActionIcon, Tooltip } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
import React, { FunctionComponent } from 'react'
import useStyles from './styles'
import format from '~/utils/format';
type Props = {
    title: string,
    content: number,
    description: string,
    currencyFormat: boolean,
    type: number,
}

const SummaryCard: FunctionComponent<Props> = ({ title, content, currencyFormat, type, description }) => {
    const { classes } = useStyles();
    return (
        <>
            <Paper shadow="sm" radius="md" p="lg" withBorder className={classes.paper}>
                <p className={classes.title}>{title.toLowerCase()}
                    <Tooltip
                        label={description}
                        position="bottom"
                        wrapLines
                        width={220}
                        withArrow
                        transition="fade"
                        transitionDuration={200}
                    >
                        <ActionIcon size="sm" radius="xl" variant="transparent" style={{ display: 'inline-block', marginLeft: 3, marginTop: 3 }}>
                            <InfoCircle
                                size={18}
                                strokeWidth={2}
                                color={'#303030'}
                                fill={'#9C9C9C'}
                            />
                        </ActionIcon>
                    </Tooltip>


                </p>
                <Text className={classes.content}>{currencyFormat ? "$" : ""}{format.formatAmount({ humanAmount: content, decimals: 4 })}</Text>
            </Paper>
        </>

    );
}

export default SummaryCard;
