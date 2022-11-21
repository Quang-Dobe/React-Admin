import { useState } from "react";
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DateTimePicker() {
    const [date, setDate] = useState(new Date());

    return (
        <LocalizationProvider m='0px 10px' dateAdapter={AdapterDateFns} >
            <DatePicker
                label="Assigned Date"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                renderInput={(props) => <TextField {...props} sx={{ m:0, p:0 }} />}
            />
        </LocalizationProvider>
    )
}

export default DateTimePicker