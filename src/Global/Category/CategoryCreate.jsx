import React, { useState } from 'react';
import { Form, TextInput, DateInput, useNotify, minValue, useListController } from 'react-admin';
import { Avatar, Button, Box, CssBaseline, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TempTable from '../../Components/TempTable';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function CategoryCreate() {
    const [isValid, setIsValid] = useState(true);
    const notify = useNotify();
    const navigate = useNavigate();
    let theme = createTheme();
    theme = unstable_createMuiStrictModeTheme(theme);

    const [open, setOpen] = useState(false);

    const handleFormSubmit = (data) => {
        // Call API (Catch error, notify error)
        console.log(data)
        // Redirect to CategoryList
        // return navigate("/api/Category")
    };

    const requiredInput = (values) => {
        const errors = {
            user: "",
            asset: "",
            assignedDate: "",
            note: ""
        };
        if (!values.assignedDate) {
            errors.assignedDate = "This is required";
            setIsValid(true);
        } else if (!values.note) {
            errors.note = "This is required";
            setIsValid(true);
        } else {
            setIsValid(false);
            return {};
        }
        return errors;
    }



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h3" variant="h5" color="#cf2338">
                        Create New Assignment
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Form mode='onBlur' validate={requiredInput} onSubmit={handleFormSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(5, minmax(0, 5fr))"
                            >
                                <Box 
                                    style={{ position:"relative" }}
                                    sx={{ gridColumn: "span 5" }}
                                    onClick={(e) => setOpen(true)}
                                >
                                    <TextInput
                                        fullWidth
                                        multiline 
                                        label="User"
                                        name="user"
                                        source="user"
                                    />

                                    {open && <TempTable setOpen={setOpen} />}
                                </Box>
                                
                                <DateInput 
                                    fullWidth
                                    label="Assigned Date"
                                    name="assignedDate"
                                    defaultValue={today}
                                    inputProps={{
                                        min: today,
                                    }}
                                    validate={minValue(today)}
                                    validateonblur="false"
                                    onBlur={(e) => e.preventDefault()}
                                    sx={{ gridColumn: "span 5" }}
                                    source="assignedDate"
                                />

                                <TextInput
                                    fullWidth
                                    multiline 
                                    label="Note"
                                    name="note"
                                    sx={{ gridColumn: "span 5" }}
                                    source="note"
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained" disabled={isValid}>
                                    Save
                                </Button>
                                <Button type="submit" color="secondary" variant="contained" onClick={(e) => navigate("/api/Category")}>
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CategoryCreate