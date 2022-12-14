import { useState, useEffect } from 'react'
import { Form, TextInput, DateInput, useNotify, minValue, RadioButtonGroupInput, ReferenceInput, SelectInput } from 'react-admin'
import { Avatar, Box, Button, Typography, Container, CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider, unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SelectBoxWithFormInside from '../../Components/SelectBoxWithFormInside';
import axios from 'axios'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function NewCategoryCreate() {
    const [category, setCategory] = useState([])
    const [isValid, setIsValid] = useState(true);
    const notify = useNotify();
    const navigate = useNavigate();
    let theme = createTheme();
    theme = unstable_createMuiStrictModeTheme(theme);
    

    const handleFormSubmit = (data) => {
        // Call API (Catch error, notify error)
        console.log(data)
        // Redirect to CategoryList
        // return navigate("/api/Category")
    };

    const requiredInput = (values) => {
        const errors = {
            name: "",
            category: "",
            specification: "",
            installedDate: "",
            state: ""
        };
        if (!values.name) {
            errors.name = "This is required";
            setIsValid(true);
        } else if (!values.category) {
            errors.category = "This is required";
            setIsValid(true);
        } else if (!values.specification) {
            errors.specification = "This is required";
            setIsValid(true);
        } else if (!values.state) {
            errors.state = "This is required";
            setIsValid(true);
        } else {
            setIsValid(false);
            return {};
        }
        return errors;
    };

    useEffect(() => {
        // You need to customize this Calling-API method
        axios.get('https://localhost:7173/api/Category')
        .then(response => setCategory(response.data))
        .catch(error => console.log(error))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                    <Typography component="h3" variant="h5" color="#cf2338" pb="40px">
                        Create New Asset
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Form validate={requiredInput} onSubmit={handleFormSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                            >
                                <Box 
                                    sx={{ display:"flex", flexDirection:"row", width:"550px" }}
                                >
                                    <Typography varient="h6" width="120px" m="0" p="0" alignSelf="center">Name</Typography>
                                    <TextInput
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        source="name"
                                        style={{ width:"430px" }}
                                        m="0" p="0"
                                        helperText={false}
                                    />
                                </Box>
                                
                                <Box 
                                    sx={{ display:"flex", flexDirection:"row", width:"550px" }}
                                >
                                    <Typography varient="h6" width="120px" m="0" p="0" alignSelf="center">Category</Typography>
                                    {/* Custom Dropdown Selection (Category) */}
                                    {/* <SelectInput 
                                        source="category"
                                        choices={category}
                                        emptyText=""
                                        optionText="name"
                                        optionValue="id"
                                    /> */}
                                    <SelectBoxWithFormInside 
                                        data={category} 
                                        source="category" 
                                    />
                                </Box>

                                <Box 
                                    sx={{ display:"flex", flexDirection:"row", width:"550px" }}
                                >
                                    <Typography varient="h6" width="120px" m="0" p="0" alignSelf="center">Specification</Typography>
                                    <TextInput
                                        fullWidth
                                        multiline
                                        rows="3"
                                        style={{ width:"430px" }}
                                        label="Specification"
                                        name="specification"
                                        source="specification"
                                        helperText={false}
                                    />
                                </Box>

                                <Box 
                                    sx={{ display:"flex", flexDirection:"row", width:"550px" }}
                                >
                                    <Typography varient="h6" width="120px" m="0" p="0" alignSelf="center">Specification</Typography>
                                    <DateInput 
                                        fullWidth
                                        label="Installed Date"
                                        name="installedDate"
                                        source="installedDate"
                                        defaultValue={today}
                                        inputProps={{ min: today }}
                                        validate={minValue(today)}
                                        onBlur={(e) => e.stopPropagation()}
                                        style={{ width:"430px" }}
                                        helperText={false}
                                    />
                                </Box>

                                <Box 
                                    sx={{ display:"flex", flexDirection:"row", width:"550px" }}
                                >
                                    <Typography varient="h6" width="120px" m="0" p="0" alignSelf="center">Specification</Typography>
                                    <RadioButtonGroupInput 
                                        // fullwidth="true"
                                        source="state"
                                        label=""
                                        choices={[ {state_id:'1', state:"Available"}, {state_id:'0', state:"Not available"} ]}
                                        row={false}
                                        style={{ width:"430px" }}
                                        optionText="state"
                                        optionValue="state_id"
                                        helperText={false}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button 
                                    type="submit"
                                    variant="contained" 
                                    disabled={isValid}
                                    sx={{ m:"10px", backgroundColor:"#cf2338" }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined" 
                                    onClick={(e) => navigate("/api/Category")}
                                    sx={{ m:"10px", color:"gray" }}
                                >
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

export default NewCategoryCreate