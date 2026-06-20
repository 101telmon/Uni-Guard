import {
    Stack,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function RecentCards() {
    return (
        <Stack spacing={1} sx={{ minWidth: "300px" }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        InfoLab Building
                    </Typography>
                    <Typography variant="h5">Low</Typography>
                    <Typography variant="body2">Plumbing</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        Margaret Fell
                    </Typography>
                    <Typography variant="h5">High</Typography>
                    <Typography variant="body2">IT/Network</Typography>
                </CardContent>
            </Card>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                        Management School
                    </Typography>
                    <Typography variant="h5">Low</Typography>
                    <Typography variant="body2">Plumbing</Typography>
                </CardContent>
            </Card>
            <Button variant="contained" component={Link} to="/admin/table">
                Full Table
            </Button>
        </Stack>
    );
}
