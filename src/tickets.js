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
     * bulk update by user name
     * @param {string} username 
     * @param {{username:string, price:number}} ticketBody 
     * @return {Ticket[]}
     */
    updateBulk(username, ticketBody) {
        const userTickets = this.findByUsername(username)
        const updatedTickets = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.updateById(ticket.id, ticketBody)
        );
        return updatedTickets;
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

    /**
     * bulk delete by user name
     * @param {*} username 
     * @return {boolean[]}
     */
    deleteBulk(username) {
        const userTickets = this.findByUsername(username);
        const deletedResult = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.deleteById(ticket.id)
        );
        return deletedResult;
    }

    /**
     * find winners
     * @param {number} winnerCounter 
     * @return {Ticket[]}
     */
    draw(winnerCounter) {
        const winnerIndexes = new Array(winnerCounter);
        let winnerIndex = 0;
        while (winnerIndex < winnerCounter) {
            let ticketIndex = Math.floor(Math.random() * this[this].length);
            if (!winnerIndexes.includes(ticketIndex)) {
                winnerIndexes[winnerIndex++] = ticketIndex;
                continue;
            }
        }
        const winners = winnerIndexes.map(
            /**
             * @param {number} index
             */
            (index) = this[tickets][index]
        );
        return winners;
    }
}

const collection = new TicketCollection();