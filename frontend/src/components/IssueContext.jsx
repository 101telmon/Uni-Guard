// Material UI Imports
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Constant Import
import { CAMPUS_LOCATIONS } from "../utils/constants";

export default function IssueContext({ formData, handleChange }) {
    const { location, category } = formData;
    return (
        <>
            <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                    name="location"
                    value={location}
                    onChange={handleChange}
                    label="Location"
                >
                    {CAMPUS_LOCATIONS.map((loc) => (
                        <MenuItem key={loc} value={loc}>
                            {loc}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value="Plumbing">Plumbing</MenuItem>
                    <MenuItem value="IT/Network">IT / Network</MenuItem>
                    <MenuItem value="Electrical">Electrical</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
