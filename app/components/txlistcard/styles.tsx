import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  tableThead: {
    backgroundColor: "#303030",
    color: "#9C9C9C",
    whiteSpace: "nowrap",
    height: 40,
  },
  tableTheadText: {
    color: "#9C9C9C !important",
    fontWeight: 500,
    lineHeight: "40px",
  },
  timeColumn: {
    fontSize: 16,
    color: "#757575",
    fontWeight: 400,
    whiteSpace: "nowrap",
  },
  otherColumn: {
    fontSize: 16,
    color: "#fff",
    fontWeight: 400,
    whiteSpace: "nowrap",
    "&:hover": {
      color: "#1A73E8",
    },
  },
  txhash: {
    color: "#1A73E8",
    fontWeight: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
    lineHeight: "32px",
  },
}));

export default useStyles;
