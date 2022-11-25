import { useState } from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton, RefreshButton } from 'react-admin';
import { useNavigate } from 'react-router-dom';
// import { ListActions, searchFilter, exporter } from '../../Components/Toolbar'
import { 
    Box, 
    Stack,
    Button,
    IconButton, 
    InputBase,
} from '@mui/material'
import Header from '../../Components/Header'
import EmptyData from '../../Components/EmptyData'
import SelectBoxWithDropDown from "../../Components/SelectBoxWithDropDown";
import DateTimePicker from '../../Components/DateTimePicker'
import SearchIcon from '@mui/icons-material/Search'
import DetailModal from "../../Components/DetailModal";


function CategoryList() {
    // const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    const [selected, setSelected] = useState([]);
    const [openDetail, setOpenDetail] = useState({ status:false, data:{} });
    let navigate = useNavigate();
    console.log("Re-rendered")

    return (
        <Box m="20px">
            <Header title="Category" />
            <Stack direction="row" spacing={1} justifyContent="space-between">
                <Box sx={{ flexDirection:'row', justifyContent:'space-around' }} >
                    <SelectBoxWithDropDown 
                        inputId="demo-simple-select-autowidth-label"
                        label="State"
                        labelId="filter-data-by-state-label"
                        style={{ m: "0 10px", minWidth: 230, width: 230 }}
                        selected={selected} 
                        setSelected={setSelected} 
                        options={["Accepted", "Waiting for acceptance"]} 
                    />

                    <DateTimePicker />
                </Box>
                
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-around' }} >
                    <Box display="flex" borderRadius="3px" border="solid 1px" m='0px 10px' w='230px' >
                        <InputBase sx={{ ml:2, flex:1 }} placeholder="Search" />
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </Box>

                    <Button variant="contained" sx={{backgroundColor:'#cf253a', padding:'0px 4px', lineHeight:'14px'}} m='0px 10px' onClick={(e) => navigate("/api/Category/create")}>Create new assignment</Button>
                </Box>
                
            </Stack>
            <Box 
                m="10px 0 0 0" 
                height="61vh" 
            >
                <List 
                    title="Category"
                    // exporter={exporter} 
                    // filters={searchFilter}
                    // actions={<ListActions />} // Add Actions to amount other component (Ex: filters, create, exporter,...)
                    queryOptions={false} // Add query option to dataProvider.getList
                    pagination={false} // Add pagination for this List
                    exporter={false}
                    actions={false}
                    sx={{m:'0px', p:'0px'}}
                    empty={<EmptyData />}
                    // disableSyncWithLocation
                >
                    <Datagrid 
                        rowClick={(id, resource, record) => {
                            // We just need record
                            // setOpenDetail({ status:true, data:record })
                            alert("Abc")
                        }}
                        bulkActionButtons={false}
                        optimizeds="true"
                    >
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="description" />
                        <EditButton label="" size='small' onClick={(e) => { e.stopPropagation(); console.log(e) }} record={(data) => console.log(data)} />
                        {/* <DeleteButton label="" size='small' onClick={(e) => { e.stopPropagation(); console.log(e) }} />
                        <RefreshButton label="" size='small' onClick={(e) => { e.stopPropagation(); console.log(e) }} /> */}
                    </Datagrid>
                </List>
            </Box>


            {/* Detail row-data modal */}
            <DetailModal 
                openDetail={openDetail} 
                setOpenDetail={setOpenDetail} 
                label="Detailed Assignment Information"
            />
        </Box>
    )
}

export default CategoryList