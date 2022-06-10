import React, { FunctionComponent } from "react";
import useStyles from "./styles";
import ReactPaginate from 'react-paginate';
import { ActionIcon } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
type Props = {
  totalPage: number;
  currentPage: number;
  onPageChange?(selectedItem: { selected: number }): void;
};

const Pagination: FunctionComponent<Props> = ({ totalPage, currentPage, onPageChange }) => {
  const { classes } = useStyles();


  return (
    <ReactPaginate
      nextLabel={<ActionIcon variant="transparent">
        <ChevronRight color="#fff" />
      </ActionIcon>}
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      pageCount={totalPage}
      previousLabel={<ActionIcon variant="transparent">
        <ChevronLeft color="#757575" />
      </ActionIcon>}
      containerClassName={classes.pagination}
      breakLabel="/"
      breakClassName={classes.pageItem}
      breakLinkClassName={classes.pageLink}
      pageClassName={classes.pageItem}
      pageLinkClassName={classes.pageLink}
    // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
