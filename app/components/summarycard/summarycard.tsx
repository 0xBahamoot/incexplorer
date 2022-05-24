import { Paper, Text, ActionIcon, Tooltip } from '@mantine/core';
// import { InfoCircle } from 'tabler-icons-react';
import React, { FunctionComponent } from 'react'
import useStyles from './styles'
import format from '~/utils/format';
import moment from 'moment';
import { CaretUp, CaretDown } from 'tabler-icons-react';

type Props = {
    title: string,
    content: any,
    changePercent?: number,
    currencyFormat: boolean,
    type: number,
}


const SummaryCard: FunctionComponent<Props> = ({ title, content, currencyFormat, type, changePercent }) => {
    const { classes } = useStyles();
    return (
        <>
            <Paper shadow="sm" radius="md" p={18} withBorder className={classes.paper}>
                <p className={classes.title}>{title.toLowerCase()}
                    {/* <Tooltip
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
                    </Tooltip> */}


                </p>
                {(typeof content === 'string' || content instanceof String) ? <Text className={classes.content}>{content}</Text> :
                    <Text className={classes.content}>
                        {currencyFormat ? "$" : ""}{format.formatAmount({ humanAmount: content, decimals: 4 })}</Text>
                }
                {
                    (changePercent !== undefined) ? <Text className={classes.subcontent} >{changePercent >= 0 ?
                        <CaretUp
                            size={18}
                            strokeWidth={1}
                            fill={'#0ECB81'}
                            color={'#0ECB81'}
                        /> :
                        <CaretDown
                            size={18}
                            strokeWidth={1}
                            fill={'#F6465D'}
                            color={'#F6465D'}
                        />}{changePercent}%</Text> : <Text>{moment().format('MM/DD/YYYY')}</Text>
                }
            </Paper>
        </>

    );
}

export default SummaryCard;
