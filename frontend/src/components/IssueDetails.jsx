// Material UI Imports
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";

export default function IssueDetails({ formData, handleChange }) {
    const { urgency, description } = formData;
    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Urgency</InputLabel>
                <Select
                    name="urgency"
                    value={urgency}
                    onChange={handleChange}
                    label="Urgency"
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <TextField
                name="description"
                label="Issue Description"
                multiline
                rows={4}
                value={description}
                onChange={handleChange}
                fullWidth
            />
        </>
    );
}
