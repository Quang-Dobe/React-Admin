import { 
    Checkbox,
    ListItemText,
    ListItemIcon,
    InputLabel, 
    FormControl, 
    Select, 
    MenuItem,
} from '@mui/material'

// Params: inputId:string, label:string, labelId:string, style:object, selected:list, setSelected:function, options:list
function SelectBoxWithDropDown({ inputId, label, labelId, style, selected, setSelected, options }) {
    const handleChange = (event) => {
        setSelected(event.target.value);
    };


    return (
        <FormControl sx={style} >
            <InputLabel id={inputId} >{label}</InputLabel>
            <Select
                labelId={labelId}
                multiple
                value={selected}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
            >
                {options.map((option, index) => {
                    return (
                        <MenuItem key={index} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selected.includes(option)} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default SelectBoxWithDropDown