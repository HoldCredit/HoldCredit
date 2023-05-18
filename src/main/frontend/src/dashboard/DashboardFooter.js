import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

function DashboardFooter(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        Hold Credit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default DashboardFooter;