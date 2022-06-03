import { Paper, Text, ActionIcon, Tooltip, Image } from '@mantine/core';
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
                <p className={classes.title}>{title}
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
                    (changePercent != 0) && (changePercent !== undefined) ? <Text className={classes.subcontent} style={{ color: changePercent >= 0 ? '#0ECB81' : '#F6465D' }}><span style={{ marginTop: 5, paddingRight: 2 }}>{changePercent >= 0 ?
                        <CaretUp
                            size={18}
                            strokeWidth={4}
                            fill={'#0ECB81'}
                            color={'#0ECB81'}
                        /> :
                        <CaretDown
                            size={18}
                            strokeWidth={4}
                            fill={'#F6465D'}
                            color={'#F6465D'}
                        />}</span> {format.formatAmount({ humanAmount: changePercent, decimals: 2 })}%</Text> : <Text>{moment().format('MM/DD/YYYY')}</Text>
                }

                <div className={classes.graphic}>
                    <Image alt="logo" src={"/assets/images/graphics/quarter.svg"} height={52} width={70} />
                </div>
            </Paper>
        </>

    );
}

export default SummaryCard;
