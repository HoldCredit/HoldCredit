import {Pagination, Stack} from "@mui/material";
import * as React from "react";

export default function Paging() {

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return(
    <>
      <Stack alignItems="center" marginTop="auto">
        <Pagination count={10} page={page} onChange={handleChange} />
      </Stack>
    </>
  )
}