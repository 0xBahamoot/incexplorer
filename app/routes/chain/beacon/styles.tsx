import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  boxInfo: {
    padding: 0,
    display: "block",
    overflow: "hidden",
    border: "1px solid #363636",
  },
  producerText: {
    color: "#fff",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 1024,
    padding: "14px 24px",
    fontWeight: 500,
  },
}));

export default useStyles;
