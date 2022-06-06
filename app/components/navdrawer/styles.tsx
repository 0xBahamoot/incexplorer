import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
        position: 'relative',
        display: 'block',
        height: 'auto',
        width: '100%',
        overflow: 'hidden',
        bottom: 70,
        left: 0
    },
    btn: {
        color: "#757575",
        fontWeight: 500,
        "&:hover": {
            color: "#fff",
        },
    },
}));

export default useStyles;
