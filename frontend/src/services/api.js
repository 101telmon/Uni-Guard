export async function submitTicket(formData) {
    const response = await fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        console.error("Could not submit the ticket.");
    }

    return response.json();
}

export async function fetchTickets() {
    const response = await fetch(`http://localhost:8000/tickets`);

    if (!response.ok) {
        console.error("Could not fetch tickets from database.");
    }
    return response.json();
}

export async function updateTicketStatus(ticketID, newStatus) {
    const response = await fetch(`http://localhost:8000/tickets`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) {
        console.error("Could not update status for a ticket.");
    }

    return response.json();
}
