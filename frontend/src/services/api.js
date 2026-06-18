export async function submitTicket(formData) {
    const response = await fetch("http://localhost:8000/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        console.error("Something went wrong with the ticket.");
    }

    return response.json();
}
