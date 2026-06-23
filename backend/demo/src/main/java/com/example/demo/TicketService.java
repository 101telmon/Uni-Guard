package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll(); 
    }

    public Optional<Ticket> getTicketById(String id) {
        return ticketRepository.findById(id);
    }

    public Ticket createTicket(Ticket ticket) {
        // If frontend didn't send a timestamp, generate one safely.
        if (ticket.getCreatedAt() == null || ticket.getCreatedAt().isEmpty()) {
            ticket.setCreatedAt(Instant.now().toString());
        }
        
        // Force all brand new tickets to start as "To Do"
        if (ticket.getStatus() == null || ticket.getStatus().isEmpty()) {
            ticket.setStatus("To Do");
        }
        
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicketStatus(String id, String newStatus) {
        Optional<Ticket> existingTicket = ticketRepository.findById(id);
        
        if (existingTicket.isPresent()) {
            Ticket ticket = existingTicket.get();
            ticket.setStatus(newStatus);
            return ticketRepository.save(ticket); // .save() overwrites if the ID already exists
        } else {
            throw new RuntimeException("Ticket not found with id: " + id);
        }
    }
}