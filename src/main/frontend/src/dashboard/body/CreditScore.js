import {Card, CardContent, Divider, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";


function CreditScore() {

  return (
    <Grid container spacing={4}>
      <Grid item md={6}>
        <Card elevation={0} sx={{height: '80vh'}}>
          <CardContent>

          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6}>
        <Card elevation={0} sx={{height: '80vh'}}>
          <CardContent>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreditScore;