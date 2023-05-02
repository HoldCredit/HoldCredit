import {Card, CardContent, Divider, Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from "@mui/x-date-pickers";

function ConsumptionIncome() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Grid container spacing={4}>
      <Grid item md={4}>
        <Card elevation={0} sx={{height: '400px'}}>
          <CardContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
                </DemoItem>
            </LocalizationProvider>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={0} sx={{height: '400px'}}>
          <CardContent>
            <h3>소비 내역</h3>
            <Divider/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card elevation={0} sx={{height: '400px'}}>
          <CardContent>
            <h3>소득 내역</h3>
            <Divider/>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ConsumptionIncome;