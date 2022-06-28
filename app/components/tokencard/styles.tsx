import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    paper: {
        backgroundColor: "#303030",
        borderRadius: 12,
        display: "block",
        overflow: "hidden",
        position: "relative",
        height: "auto",
    },
    title: {
        fontStyle: "normal",
        fontWeight: 500,
        // fontSize: 16,
        lineHeight: 1,
        letterSpacing: "0.005em",
        margin: "5px 0 0",
        color: "#757575",
        // textTransform: 'capitalize',
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
    },
    content: {
        fontStyle: "normal",
        fontWeight: 500,
        // fontSize: 22,
        // lineHeight: "36.4px",
        letterSpacing: "0.01em",
        // margin: "14px 0 5px",
        color: "#fff",
    },
    subcontent: {
        fontSize: 14,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        height: 26,
    },
    graphic: {
        position: "absolute",
        right: 0,
        bottom: 0,
        display: "block",
        overflow: "hidden",
    },
}));

export default useStyles;
