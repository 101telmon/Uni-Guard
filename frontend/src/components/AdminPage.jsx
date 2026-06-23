// React Imports
import { Box, Typography, Button } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Link } from "react-router-dom";

// React Component Imports
import SummaryCards from "./SummaryCards";
import SummaryChart from "./SummaryChart";
import RecentCards from "./RecentCards";

export default function AdminPage() {
    return (
        <>
            <Button variant="contained" component={Link} to="/">
                To Student View
            </Button>
            <Typography variant="h3" color="primary" gutterBottom>
                UniGuard
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "grey.100",
                        padding: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Summary
                    </Typography>
                    <SummaryCards />
                </Box>
                <Box
                    sx={{
                        bgcolor: "grey.100",
                        padding: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Most Recent
                    </Typography>
                    <RecentCards />
                </Box>
                <Box
                    sx={{
                        bgcolor: "grey.100",
                        padding: 2,
                    }}
                >
                    <Typography variant="h6">Tickets by Category</Typography>
                    <SummaryChart />
                </Box>
            </Box>
        </>
    );
}
