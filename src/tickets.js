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
     * create bulk tickets
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @return {Ticket[]}
     */
    createBulk(username, price, quantity) {
        const result = []
        for (let i = 0; i < quantity; i++) {
            const ticket = this.create(username, price);
            result.push(ticket)
        }
        return result;
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


    findById(id) {
        const ticket = this[tickets].find(
            /**
             * @param {Ticket}ticket
             */
            (ticket) => ticket.id == id
        );
        return ticket
    }

    /**
     * find tickets by username
     * @param {string} username 
     * @return {Ticket[]}
     */
    findByUsername(username) {
        const tickets = this[tickets].filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username == username
        );
        return tickets
    }

    /**
     * update by id
     * @param {string} ticketId 
     * @param {{username:string,price:number}} ticketBody 
     * @return {Ticket}
     */

    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId)
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;

        return ticket;
    }

    /**
     * delete ticket by id
     * @param {string} ticketId 
     * @return (boolean) 
     */
    deleteById(ticketId) {
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticketId.id == ticketId
        )
        if (index == -1) {
            return false;
        }
        else {
            this[tickets].splice(index, 1);
            return true;
        }
    }
}

const collection = new TicketCollection();