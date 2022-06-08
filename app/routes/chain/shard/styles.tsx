import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    boxInfo: {
        padding: 0,
        display: "block",
        overflow: "hidden",
    },
    producerText: {
        color: "#fff",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: 1024,
        padding: "14px 24px",
        fontWeight: 500,
    }
}));

export default useStyles;