import {Card, CardContent, Container, Divider, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";

function Assets() {

  return (
    <Grid container spacing={4} direction="column"
          justifyContent="center" alignItems="stretch">
      <Grid item md={4}>
        <Card elevation={0} sx={{height: '50vh'}}>
          <CardContent>

          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={0} sx={{height: '50vh'}}>
          <CardContent>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Assets;