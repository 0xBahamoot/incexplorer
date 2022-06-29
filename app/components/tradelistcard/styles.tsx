import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "#1A1A1A",
    width: "100%",
    overflow: "hidden",
  },
  tableThead: {
    backgroundColor: "#303030",
    color: "#9C9C9C",
    whiteSpace: "nowrap",
    height: 40,
    'th': {
      position: 'sticky',
      insetBlockStart: 0,
      backgroundColor: "#303030",
      color: "#9C9C9C",
      whiteSpace: "nowrap",
      height: 40,
      zIndex: 9,
      // position: sticky;
      // top: 0;
    },
    // 'thead': {
    //   insetBlockStart: 0,
    // }
  },
  tableTheadText: {
    color: "#9C9C9C !important",
    fontWeight: 500,
    lineHeight: "40px",
  },
  txhash: {
    color: "#1A73E8",
    fontWeight: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
}));

export default useStyles;
