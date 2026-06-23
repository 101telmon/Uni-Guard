// Base React Imports
import { useState, useEffect } from "react";

// React Chart Import
import { PieChart } from "@mui/x-charts/PieChart";

// API Function Import
import { fetchTickets } from "../services/api";

export default function SummaryChart() {
    const [chartData, setChartData] = useState([]);

    // 3 colours for 3 categories
    const categoryColors = {
        Plumbing: "#1976d2",
        "IT/Network": "#9c27b0",
        Electrical: "#2e7d32",
    };

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();

                // Counting tickets by category
                const categoryCounts = {};
                data.forEach((ticket) => {
                    if (!ticket.category) return;
                    categoryCounts[ticket.category] =
                        (categoryCounts[ticket.category] || 0) + 1;
                });

                // Formatting counts into array structure the PieChart requires
                const formattedData = Object.entries(categoryCounts).map(
                    ([categoryName, count], index) => ({
                        id: index,
                        value: count,
                        label: categoryName,
                        // Provide default color if an unknown category appears
                        color: categoryColors[categoryName] || "#757575",
                    }),
                );

                setChartData(formattedData);
            } catch (error) {
                console.error("Error loading tickets for chart: ", error);
            }
        };

        getTickets();
    }, []);

    return (
        <>
            <PieChart
                series={[
                    {
                        data: chartData,
                        innerRadius: 80,
                        outerRadius: 130,
                        paddingAngle: 3,
                        cornerRadius: 5,
                    },
                ]}
                width={500}
                height={350}
                slotProps={{
                    legend: {
                        direction: "column",
                        position: {
                            vertical: "middle",
                            horizontal: "right",
                        },
                    },
                }}
            />
        </>
    );
}
