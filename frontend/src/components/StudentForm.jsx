/// React Imports
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

/// Custom React Imports
import IssueContext from "./IssueContext.jsx";
import IssueDetails from "./IssueDetails.jsx";
import Success from "./Success.jsx";

/// Other Imports
import { submitTicket } from "../services/api.js";
import { FORM_STEPS } from "../utils/constants.js";

export default function Form() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        location: "",
        category: "",
        urgency: "",
        description: "",
    });

    /// Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        // We are only changing the variable that needs to be changed, rest is unaffected.
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
    // Submits our new form to the API URL we have given.
    const handleSubmit = async () => {
        try {
            await submitTicket(formData);
            setActiveStep((prev) => prev + 1);
        } catch (error) {
            console.error("An error occured: ", error);
        }
    };

    /// Splitting Content based on Stepper
    const displayStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <IssueContext
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case 1:
                return (
                    <IssueDetails
                        formData={formData}
                        handleChange={handleChange}
                    />
                );
            case 2:
                return (
                    <Success
                        setFormData={setFormData}
                        setActiveStep={setActiveStep}
                    />
                );
            default:
                return "Unknown step counted.";
        }
    };
    /// Helper Functions
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

    /// Main Return
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    marginTop: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Report an issue.
                </Typography>
                {/* Stepper is used to signify what step you are on in the report process.
                Should be "Issue Context", then "Issue Details", then finally "Success" screen. */}
                <Stepper
                    activeStep={activeStep}
                    sx={{
                        margin: "0 auto",
                        width: "100%",
                        maxWidth: "450px",
                    }}
                >
                    {FORM_STEPS.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                    width: "100%",
                    maxWidth: "450px",
                    marginTop: 4,
                    gap: 2,
                }}
            >
                {displayStepContent(activeStep)}
            </Box>
            {/* Our "Next" (or "Submit") and "Back" buttons at the bottom.*/}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
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
                    {activeStep === FORM_STEPS.length - 2 ? "Submit" : "Next"}
                </Button>
            </Box>
        </>
    );
}
