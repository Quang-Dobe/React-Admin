import { Box, Typography, useTheme } from "@mui/material"

function Header({ title }) {
    const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    return (
        <Box m="10px" mb="20px">
            <Typography variant="h5" color="#cf253a" fontWeight="bold" >{title}</Typography>
        </Box>
    )
}

export default Header