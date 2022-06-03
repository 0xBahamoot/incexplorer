import { Box } from "@mantine/core";
import React, { FunctionComponent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import MainNavbar from "~/mainnavbar";

type Props = {};

const NavDrawer: FunctionComponent<Props> = ({}) => {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <>
      <Box>
        <MainNavbar />
      </Box>
    </>
  );
};

export default NavDrawer;
