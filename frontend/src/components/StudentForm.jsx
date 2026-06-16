import { useState, useRef } from "react";
import { 
    Container, 
    Box,
    Paper, 
    Typography, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Button,
    Autocomplete,
    Menu
} from '@mui/material';

const campusLocations = [
    "Library",
    "Science and Technology Building",
    "InfoLab Building",
    "George Fox Building",
    "Management School",
    "Margaret Fell"
]

export default function StudentForm() {
    const [location, setLocation] = useState(null);
    const [category, setCategory] = useState("");
    const description = useRef(null);
    const [urgency, setUrgency] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents browser from refreshing page
        const ticket = {
            location: location,
            category: category,
            description: description.current.value,
            urgency: urgency,
            status: "Pending",
            createdAt: new Date().toISOString()
        }

        console.log("New ticket!!!: ", ticket);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={ handleSubmit }
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        mt: 2
                    }}
                >
                    <Typography>Report an issue.</Typography>
                    <Autocomplete 
                        options={campusLocations}
                        value={location}
                        onChange={(event, newValue) => setLocation(newValue)}
                        renderInput={(params) => <TextField {...params} label="Location" fullWidth />}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                            <MenuItem value={"IT/Network"}>IT / Network</MenuItem>
                            <MenuItem value={"Electrical"}>Electrical</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        label="Description" 
                        multiline 
                        rows={4} 
                        fullWidth
                        inputRef={description}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Urgency</InputLabel>
                        <Select
                            value={urgency}
                            label="Urgency"
                            onChange={(e) => setUrgency(e.target.value)}
                        >
                            <MenuItem value={"Low"}>Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                    </FormControl>
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        fullWidth
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Container>
        </div>
    )
}