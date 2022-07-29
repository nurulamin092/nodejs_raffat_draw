const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils');

const tickets = Symbol('tickets')

class TicketCollection {
    constructor() {
        this.tickets = [];
    }


    /**
     * create and save a new ticket
     * @param {string} username 
     * @param {number} price 
     * @return {Ticket}
     */

    create(username, price) {
        const ticket = new Ticket(username, price);
        this[ticket].push(ticket);
        return tickets;

    }

    /**
     * return all tickets from db
     */

    find() {
        return this[tickets];
    }
    /**
     * 
     * @param {string} id 
     * @return {Ticket}
     */


    findTicketById(id) {
        const ticket = this[tickets].find(
            /**
             * @param {Ticket}ticket
             */
            (ticket) => ticket.id == id
        );
        return ticket
    }
}

const collection = new TicketCollection();