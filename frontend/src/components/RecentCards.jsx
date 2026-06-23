// Base React Imports
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Material UI Imports
import {
    Stack,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";

// API Function Import
import { fetchTickets } from "../services/api";

export default function RecentCards() {
    const [recentTickets, setRecentTickets] = useState([]);

    useEffect(() => {
        const loadRecentTickets = async () => {
            try {
                const data = await fetchTickets();
                // Grab last 3 and reverse them to show newest ticket first, not last
                const latestThree = data.slice(-3).reverse();
                setRecentTickets(latestThree);
            } catch (error) {
                console.error("Error loading recent tickets: ", error);
            }
        };

        loadRecentTickets();
    }, []);

    return (
        <Stack spacing={1} sx={{ minWidth: "300px" }}>
            {recentTickets.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No recent tickets.
                </Typography>
            ) : (
                recentTickets.map((ticket) => (
                    <Card key={ticket.id} variant="outlined">
                        <CardContent>
                            <Typography
                                sx={{ color: "text.secondary", fontSize: 14 }}
                            >
                                {ticket.location}
                            </Typography>
                            <Typography variant="h5">
                                {ticket.urgency}
                            </Typography>
                            <Typography variant="body2">
                                {ticket.category}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
            <Button variant="contained" component={Link} to="/admin/table">
                Full Table
            </Button>
        </Stack>
    );
}
