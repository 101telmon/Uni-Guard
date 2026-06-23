// Material UI Imports
import { Typography, Button } from "@mui/material";

export default function Success({ setFormData, setActiveStep }) {
    return (
        <>
            <Typography variant="h5" color="primary">
                Ticket submitted!
            </Typography>
            <Typography variant="body1">
                Thank you for your report! We will bring a member of our team to
                fix the issues. If you would like to report another issue,
                please submit another ticket.
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
        </>
    );
}
