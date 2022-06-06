import { Box, Group, Stack, Button, Title, Center } from "@mantine/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import useStyles from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import MainNavbar from "~/mainnavbar";

type Props = {};

const NavDrawer: FunctionComponent<Props> = ({ }) => {
  let location = useLocation();
  let navigate = useNavigate();
  const { classes } = useStyles();

  return (
    <>

      <MainNavbar />

    </>
  );
};

export default NavDrawer;
