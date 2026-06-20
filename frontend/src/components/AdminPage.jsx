import AdminDashboard from "./AdminDashboard";
import { Typography } from "@mui/material";

export default function AdminPage() {
    return (
        <>
            <Typography variant="h3" color="primary" gutterBottom>
                UniGuard
            </Typography>
            {/* For now, dashboard will be here, changing it soon. */}
            <AdminDashboard />
        </>
    );
}
