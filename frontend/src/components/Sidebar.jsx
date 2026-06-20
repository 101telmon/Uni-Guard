import { Tabs, Tab, Box } from "@mui/material";
import { Link, useLocation, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import PersonIcon from "@mui/icons-material/Person";

export default function Sidebar() {
    const location = useLocation();

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Tabs
                orientation="vertical"
                value={location.pathname}
                sx={{
                    borderRight: 0,
                    minWidth: 150,
                    bgcolor: "grey.100",
                }}
            >
                <Tab
                    label="Profile"
                    value="/admin/profile"
                    component={Link}
                    to="/admin/profile"
                    icon={<PersonIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="Dashboard"
                    value="/admin/"
                    component={Link}
                    to="/admin/"
                    icon={<DashboardIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="Full Table"
                    value="/admin/table"
                    component={Link}
                    to="/admin/table"
                    icon={<TableViewIcon />}
                    iconPosition="start"
                />
            </Tabs>
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
