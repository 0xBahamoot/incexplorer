import { createStyles } from '@mantine/core';

const accordionLabelStyle = createStyles((theme, _params, getRef) => ({
    control: {
        ref: getRef('control'),
        border: 0,
        borderRadius: 12,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? '#303030' : theme.colors.gray[1],
            opacity: 1,
        },
    },

    item: {
        borderBottom: 0,
        overflow: 'hidden',
        transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
        border: '1px solid transparent',
        borderRadius: theme.radius.sm,
    },

    itemOpened: {
        [`& .${getRef('control')}`]: {
            opacity: 1,
        },

        [`& .${getRef('icon')}`]: {
            transform: 'rotate(45deg)',
        },
    },

}));


export { accordionLabelStyle };