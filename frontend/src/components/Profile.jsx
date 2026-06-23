import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <>
            <Button variant="contained" component={Link} to="/">
                To Student View
            </Button>
            <Typography variant="h3" color="primary" gutterBottom>
                UniGuard
            </Typography>
            <p>Will not be done yet.</p>
        </>
    );
}
