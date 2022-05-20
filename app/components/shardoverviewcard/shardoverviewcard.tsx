import { Paper, Text, ActionIcon, Tooltip } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
import React, { FunctionComponent } from 'react'
import useStyles from './styles'
import format from '~/utils/format';
type Props = {

}

const ShardOverviewCard: FunctionComponent<Props> = ({ }) => {
    const { classes } = useStyles();
    return (
        <>
            <Paper shadow="sm" radius="md" p="lg" withBorder className={classes.paper}>

            </Paper>
        </>

    );
}

export default ShardOverviewCard;
