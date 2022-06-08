import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    container: {
        backgroundColor: "#1A1A1A",
        overflow: "hidden",
        border: "1px solid #303030",
    },
    tableThead: {
        backgroundColor: "#303030",
        color: "#9C9C9C",
    },
    tableTheadText: {
        color: "#9C9C9C !important",
        fontWeight: 500,
    },
    wrapper: {
        borderColor: "#303030",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        padding: "8px 24px 10px",
        overflow: "hidden",
        height: 50,
        "&:last-child": {
            borderBottomWidth: 0,
            padding: "10px 24px 10px",
        },
    },
    propertyName: {
        fontSize: 16,
        fontWeight: 500,
        color: "#757575",
    },
    propertyValue: {
        fontSize: 16,
        fontWeight: 400,
        color: "#fff",
    },
}));

export default useStyles;