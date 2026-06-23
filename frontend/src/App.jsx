// Base React Imports
import { HashRouter, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";

// React Component Imports
import StudentForm from "./components/StudentForm";
import FullTable from "./components/FullTable";
import Profile from "./components/Profile";
import AdminPage from "./components/AdminPage";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<StudentForm />} />
                    <Route path="/admin" element={<Sidebar />}>
                        <Route index element={<AdminPage />} />
                        <Route path="table" element={<FullTable />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
