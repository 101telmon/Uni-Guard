package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "http://localhost:5173") // Prevents CORS blocks from your local React app!
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // GET http://localhost:8080/tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    // POST http://localhost:8080/tickets
    // @RequestBody turns the incoming JSON string into a Java Ticket object automatically
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    // PATCH http://localhost:8080/tickets/{id}/status
    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable String id, 
            @RequestBody String newStatus) {
        
        try {
            // Clean up quotes if the frontend sends the status as a raw JSON string
            String cleanedStatus = newStatus.replace("\"", "").trim();
            Ticket updatedTicket = ticketService.updateTicketStatus(id, cleanedStatus);
            return ResponseEntity.ok(updatedTicket);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Sends a clean 404 back if ID doesn't exist
        }
    }
}