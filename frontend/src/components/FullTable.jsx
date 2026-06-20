import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Database from "./Database";

export default function FullTable() {
    return (
        <>
            <Button variant="contained" component={Link} to="/">
                To Student View
            </Button>
            <Typography variant="h3" color="primary" gutterBottom>
                UniGuard
            </Typography>
            <Database />
        </>
    );
}
