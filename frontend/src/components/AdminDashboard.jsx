import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Menu,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchTickets, updateTicketStatus } from "../services/api";

export default function AdminDashboard() {
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

    const handleStatusChange = async (ticketID, newStatus) => {
        try {
            await updateTicketStatus(ticketID, newStatus);
            setTickets((prev) =>
                updateByID(prev, ticketID, { status: newStatus }),
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const updateByID = (arr, ticketID, newStatus) => {
        return arr.map((ticket) => {
            if (ticket.id === ticketID) {
                return { ...ticket, ...newStatus };
            } else {
                return ticket;
            }
        });
    };

    const showTickets = () => {
        return tickets.map((ticket) => (
            <TableRow key={ticket.id}>
                <TableCell>
                    <Select
                        value={ticket.status}
                        onChange={(e) =>
                            handleStatusChange(ticket.id, e.target.value)
                        }
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </TableCell>
                <TableCell>{ticket.location}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{ticket.urgency}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.id}</TableCell>
            </TableRow>
        ));
    };

    return (
        <Box
            sx={{
                marginTop: 4,
                padding: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Dashboard
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell>
                                <strong>Status</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Location</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Category</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Urgency</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Description</strong>
                            </TableCell>
                            <TableCell>
                                <strong>ID</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No tickets found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            showTickets()
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
