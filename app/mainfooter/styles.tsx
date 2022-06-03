import { createStyles } from "@mantine/core";
import { BorderRadius } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  btn: {
    color: "#757575",
    fontWeight: 500,
    "&:hover": {
      color: "#fff",
    },
  },
}));

export default useStyles;
