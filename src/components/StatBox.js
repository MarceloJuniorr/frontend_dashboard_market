import { Box, Typography } from '@mui/material';

const StatBox = ({ title, value }) => (
    <Box sx={{ padding: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" fontWeight="bold">{value}</Typography>
    </Box>
);

export default StatBox;
