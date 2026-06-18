import { act, useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Menu,
    Typography,
} from "@mui/material";

const steps = ["Issue Context", "Issue Details", "Success"];
const campusLocations = [
    "Library",
    "Science and Technology Building",
    "InfoLab Building",
    "George Fox Building",
    "Management School",
    "Margaret Fell",
];

export default function Form() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        location: "",
        category: "",
        urgency: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNextStep = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };
    const handleBackStep = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setActiveStep((prev) => prev + 1);
            } else {
                console.error("Something went wrong with the ticket.");
            }
        } catch (error) {
            console.error("An error occured: ", error);
        }
    };

    const contentZero = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    marginTop: 4,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        label="Location"
                    >
                        {campusLocations.map((loc) => (
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
                        value={formData.category}
                        onChange={handleChange}
                        label="Category"
                    >
                        <MenuItem value="Plumbing">Plumbing</MenuItem>
                        <MenuItem value="IT/Network">IT / Network</MenuItem>
                        <MenuItem value="Electrical">Electrical</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    };
    const contentOne = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    marginTop: 4,
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Urgency</InputLabel>
                    <Select
                        name="urgency"
                        value={formData.urgency}
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
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>
        );
    };
    const contentSuccess = () => {
        return (
            <Box
                sx={{
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Typography variant="h5" color="primary">
                    Ticket submitted!
                </Typography>
                <Typography variant="body1">
                    Thank you for your report, the team has received your
                    report.
                </Typography>
                <Button
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                    onClick={() => {
                        setActiveStep(0);
                        setFormData({
                            location: "",
                            category: "",
                            urgency: "",
                            description: "",
                        });
                    }}
                >
                    Submit New Ticket
                </Button>
            </Box>
        );
    };
    const checkForBlanks = () => {
        if (activeStep === 0) {
            return formData.location !== "" && formData.category !== "";
        }
        if (activeStep === 1) {
            return (
                formData.urgency !== "" && formData.description.trim() !== ""
            );
        }
        return false;
    };
    const showForm = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 4,
                    gap: 2,
                }}
            >
                <Button
                    disabled={activeStep === 0 || activeStep === 2}
                    onClick={handleBackStep}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={activeStep === 1 ? handleSubmit : handleNextStep}
                    disabled={activeStep === 2 || !checkForBlanks()}
                >
                    {activeStep === steps.length - 2 ? "Submit" : "Next"}
                </Button>
            </Box>
        );
    };
    const displayStepContent = (step) => {
        switch (step) {
            case 0:
                return contentZero();
            case 1:
                return contentOne();
            case 2:
                return contentSuccess();
            default:
                return "Unknown step counted.";
        }
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    marginTop: 4,
                }}
            >
                <Typography varient="h4" gutterBottom>
                    Report an issue.
                </Typography>
                {/* Stepper is used to signify what step you are on in the report process.
                Should be "Issue Context", then "Issue Details". */}
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {displayStepContent(activeStep)}
            {activeStep === steps.length ? contentSuccess() : showForm()}
        </>
    );
}
