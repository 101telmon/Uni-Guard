package com.example.demo; 

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository; // Fake "database"

    @InjectMocks
    private TicketService ticketService; // Service to test

    @Test
    void testCreateTicket_AssignsDefaultStatus_WhenStatusIsEmpty() {
        Ticket newTicket = new Ticket();
        newTicket.setLocation("Library");
        newTicket.setDescription("Wi-Fi is down");

        when(ticketRepository.save(any(Ticket.class))).thenAnswer(i -> i.getArguments()[0]);

        Ticket savedTicket = ticketService.createTicket(newTicket);

        assertEquals("To Do", savedTicket.getStatus(), "The Service should have assigned 'To Do' as the status.");
        assertNotNull(savedTicket.getCreatedAt(), "The Service should have generated a timestamp.");
    }
}