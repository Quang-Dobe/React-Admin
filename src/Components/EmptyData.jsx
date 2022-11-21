import { Box, Button, Typography } from '@mui/material';
import { CreateButton, List } from 'react-admin';

function EmptyData() {
    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                No products available
            </Typography>
            <Typography variant="body1">
                Create one or import from a file
            </Typography>
            <CreateButton />
            <Button /* onClick={} */>Import</Button>
        </Box>
    )
}

export default EmptyData