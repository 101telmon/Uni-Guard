import Database from "./Database";
import { Box, Typography, Button } from "@mui/material";
import SummaryCards from "./SummaryCards";
import RecentCards from "./RecentCards";
import { PieChart } from "@mui/x-charts/PieChart";
import { Link } from "react-router-dom";

export default function AdminPage() {
    // Fake chart data
    const chartData = [
        { id: 0, value: 12, label: "Plumbing", color: "#1976d2" },
        { id: 1, value: 8, label: "IT/Network", color: "#9c27b0" },
        { id: 2, value: 5, label: "Electrical", color: "#2e7d32" },
    ];

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
                    <PieChart
                        series={[
                            {
                                data: chartData,
                                innerRadius: 80,
                                outerRadius: 130,
                                paddingAngle: 3,
                                cornerRadius: 5,
                            },
                        ]}
                        width={500}
                        height={350}
                        slotProps={{
                            legend: {
                                direction: "column",
                                position: {
                                    vertical: "middle",
                                    horizontal: "right",
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}
