const BASE_URL = "https://my-json-server.typicode.com/101telmon/Uni-Guard";

export async function submitTicket(formData) {
    const response = await fetch(`${BASE_URL}/tickets`, {
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
    const response = await fetch(`${BASE_URL}/tickets`);

    if (!response.ok) {
        console.error("Could not fetch tickets from database.");
    }
    return response.json();
}

export async function updateTicketStatus(ticketID, newStatus) {
    const response = await fetch(`${BASE_URL}/tickets/${ticketID}`, {
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
