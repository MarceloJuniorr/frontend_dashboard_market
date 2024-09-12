import { TextField } from '@mui/material';

const DataInput = ({ label, value, onChange }) => (
    <TextField
        label={label}
        type="date"
        value={value}
        onChange={onChange}
        fullWidth
        InputLabelProps={{
            shrink: true,
        }}
    />
);

export default DataInput;
