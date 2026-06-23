// Material UI Imports
import {
    Stack,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";

// Base React Import
import { useState, useEffect } from "react";

// API Function Import
import { fetchTickets } from "../services/api";

export default function SummaryCards() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (error) {
                console.error("Error loading tickets: ", error);
            }
        };

        getTickets();
    }, []);

    // Ticket counts for Summary Cards
    const totalTicketCount = tickets.length;
    const highUrgencyCount = tickets.filter(
        (ticket) => ticket.urgency === "High",
    ).length;
    const inProgressCount = tickets.filter(
        (ticket) => ticket.status === "In Progress",
    ).length;
    const completedCount = tickets.filter(
        (ticket) => ticket.status === "Completed",
    ).length;

    let hotspotLocation = "N/A";
    let maxLocCount = 0;
    const locationCounts = {};

    tickets.forEach((ticket) => {
        if (!ticket.location) return; // Skip if location is undefined

        // We take the current count for the location: if it hasn't been counted yet, then we return 0,
        // otherwise we get the current location's count and add 1 to it.
        locationCounts[ticket.location] =
            (locationCounts[ticket.location] || 0) + 1;

        // If location's count is larger than the current max, then we set a new max and set the new hotspot location.
        if (locationCounts[ticket.location] > maxLocCount) {
            maxLocCount = locationCounts[ticket.location];
            hotspotLocation = ticket.location;
        }
    });

    return (
        <Stack spacing={1} sx={{ minWidth: "300px" }}>
            <Stack direction="row">
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="body1">
                            {totalTicketCount}
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Hotspot</Typography>
                        <Typography variant="body1">
                            {hotspotLocation}
                        </Typography>
                    </CardContent>
                </Card>
            </Stack>
            <Card variant="outlined" sx={{ bgcolor: "#ff7979" }}>
                <CardContent>
                    <Typography variant="h6">High Urgency</Typography>
                    <Typography variant="body1">{highUrgencyCount}</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ bgcolor: "#ffcd64" }}>
                <CardContent>
                    <Typography variant="h6">In Progress</Typography>
                    <Typography variant="body1">{inProgressCount}</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ bgcolor: "#8bff64" }}>
                <CardContent>
                    <Typography variant="h6">Completed</Typography>
                    <Typography variant="body1">{completedCount}</Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}
