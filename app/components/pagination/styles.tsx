import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  pagination: {
    display: "flex",
    listStyle: "none",
    borderRadius: 100,
    height: 32,
    margin: 0,
    width: "auto",
    backgroundColor: "#303030",
    padding: "2px 5px",
    overflow: "hidden",
    "li .selected": {
      pageLink: {
        backgroundColor: "#fff",
      },
    },
  },
  pageItem: {
    "&.selected": {
      [`& .${getRef("page-link")}`]: {
        color: "#fff",
      },
    },
  },
  pageLink: {
    ref: getRef("page-link"),
    position: "relative",
    display: "block",
    color: "#757575",
    textDecoration: "none",
    lineHeight: "28px",
    padding: "0 6px",
    fontWeight: 400,
    ":hover": {
      cursor: "pointer",
      color: "#fff",
    },
    ":disabled": {
      color: "#000",
    },
  },

  actionBtn: {
    root: { ":hover": { backgroundColor: "transparent" } },
  },
}));

export default useStyles;
