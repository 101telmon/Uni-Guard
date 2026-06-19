import { HashRouter, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import StudentForm from "./components/StudentForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
    return (
        <>
            <Typography variant="h3" color="primary" gutterBottom>
                UniGuard
            </Typography>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<StudentForm />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
