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
    Button,
    Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Sidebar from "./Sidebar.jsx";
import { useState, useEffect } from "react";
import { fetchTickets, updateTicketStatus } from "../services/api";
import { DASHBOARD_REFRESH_RATE } from "../utils/constants.js";

export default function AdminDashboard() {
    const [tickets, setTickets] = useState([]);
    const [cooldown, setCooldown] = useState(false);

    // Getting tickets as soon as site loads
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

    // Temporary, will improve
    const autoRefreshDashboard = () => {
        setInterval(() => {
            fetchTickets();
        }, DASHBOARD_REFRESH_RATE * 1000);
    };

    const handleManualRefresh = () => {
        setCooldown(true);
        fetchTickets();
        setTimeout(() => {
            setCooldown(false);
        }, 5000);
    };

    autoRefreshDashboard();

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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Dashboard
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption">
                        auto-refreshes every 30s.
                    </Typography>
                    <Tooltip
                        describeChild
                        title="You can refresh manually every 5 seconds."
                    >
                        <span>
                            <Button
                                variant="contained"
                                startIcon={<RefreshIcon />}
                                onClick={handleManualRefresh}
                                disabled={cooldown}
                            >
                                Refresh
                            </Button>
                        </span>
                    </Tooltip>
                </Box>
            </Box>
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
