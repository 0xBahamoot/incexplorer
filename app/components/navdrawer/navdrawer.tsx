import { Box, Group, Stack, Button, Title, Center } from "@mantine/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import MainNavbar from "~/mainnavbar";

type Props = {
  onNav?: () => void;
};

const NavDrawer: FunctionComponent<Props> = ({ onNav }) => {
  let location = useLocation();
  let navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <>

      <MainNavbar onNav={onNav} />

    </>
  );
};

export default NavDrawer;
