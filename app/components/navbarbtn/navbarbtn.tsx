import { Box } from "@mantine/core";
import React, { FunctionComponent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

type Props = {
  text: string;
  link: string;
  external?: boolean;
};

const NavbarBtn: FunctionComponent<Props> = ({ text, link, external }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    console.log("location.pathname", location.pathname, link);
    if (location.pathname === link) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [location]);
  return (
    <>
      <Box
        onClick={() => {
          if (external) {
            window.open(link, "_blank");
          } else {
            navigate(link, { replace: true });
          }
        }}
        sx={(theme) => ({
          backgroundColor: isSelected
            ? theme.colorScheme === "dark"
              ? "#303030"
              : theme.colors.gray[1]
            : "transparent",
          textAlign: "left",
          padding: theme.spacing.sm,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "0.01em",
          paddingLeft: 45,
          color: isSelected
            ? theme.colorScheme === "dark"
              ? "#fff"
              : "#000"
            : theme.colorScheme === "dark"
              ? "#757575"
              : "#000",
          cursor: "pointer",
          textDecoration: "none",
          height: 40,
          lineHeight: "18px",
          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark" ? "#303030" : theme.colors.gray[1],
            color: theme.colorScheme === "dark" ? "#fff" : "#000",
          },
        })}
      >
        {text}
      </Box>
    </>
  );
};

export default NavbarBtn;
