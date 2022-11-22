import { Box } from '@mui/material'
import { useListController, ListContextProvider, Datagrid, List, TextField } from 'react-admin'


function TempTable({ setOpen }) {
    const listContext = useListController({
        resource: 'api/Category'
    });
    console.log(listContext)

    return (
        <ListContextProvider value={listContext}>
            <Box 
                style={{ 
                    position:"absolute", 
                    backgroundColor:"red", 
                    width:"100px", 
                    height:"100px",
                    top: 0,
                    left: 0,
                    zIndex: 100 
                }}
            >
                <List
                    title="Category"
                    queryOptions={false} // Add query option to dataProvider.getList
                    pagination={false} // Add pagination for this List
                    exporter={false}
                    actions={false}
                    sx={{m:'0px', p:'0px'}}
                >
                    <Datagrid
                        bulkActionButtons={false}
                        optimizeds="true"
                    >
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="description" />
                    </Datagrid>
                </List>
                <button onClick={(e) => {e.stopPropagation(); setOpen(false)}}>Close</button>
            </Box>
        </ListContextProvider>
    )
}

export default TempTable