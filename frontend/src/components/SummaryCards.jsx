import {
    Stack,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
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

    const totalTicketCount = () => {
        return tickets.length;
    };
    const highUrgencyCount = tickets.filter(
        (ticket) => ticket.urgency === "High",
    ).length;
    const inProgressCount = tickets.filter(
        (ticket) => ticket.status === "In Progress",
    ).length;
    const completedCount = tickets.filter(
        (ticket) => ticket.status === "Completed",
    ).length;

    return (
        <Stack spacing={1} sx={{ minWidth: "300px" }}>
            <Stack direction="row">
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="body1">0</Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Hotspot</Typography>
                        <Typography variant="body1">(location here)</Typography>
                    </CardContent>
                </Card>
            </Stack>
            <Card variant="outlined" sx={{ bgcolor: "#ff7979" }}>
                <CardContent>
                    <Typography variant="h6">High Urgency</Typography>
                    <Typography variant="body1">0</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ bgcolor: "#ffcd64" }}>
                <CardContent>
                    <Typography variant="h6">In Progress</Typography>
                    <Typography variant="body1">0</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ bgcolor: "#8bff64" }}>
                <CardContent>
                    <Typography variant="h6">Resolved</Typography>
                    <Typography variant="body1">0</Typography>
                </CardContent>
            </Card>
        </Stack>
    );
}
