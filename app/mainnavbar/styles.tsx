import { createStyles } from "@mantine/core";

const accordionLabelStyle = createStyles((theme, _params, getRef) => ({
  control: {
    ref: getRef("control"),
    border: 0,
    borderRadius: 8,
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? "#303030" : theme.colors.gray[1],
      opacity: 1,
    },
  },
  item: {
    borderBottom: 0,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: "1px solid transparent",
    borderRadius: 0,

    [`& .${getRef("icon")}`]: {
      color: "#757575",
    },
  },

  itemOpened: {
    [`& .${getRef("control")}`]: {
      opacity: 1,
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)",
      color: "#fff",
    },
  },
  icon: {
    marginLeft: 5,
  },

  controlMobile: {
    ref: getRef("control"),
    border: 0,
    borderRadius: 0,
    height: 50,
    paddingTop: 5,
    paddingBottom: 5,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? "#303030" : theme.colors.gray[1],
      opacity: 1,
    },
  },
}));

export { accordionLabelStyle };
