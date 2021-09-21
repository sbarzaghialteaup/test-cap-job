# Getting Started

Example to use a CAP db transaction not related to a http request, we use for to scheduled jobs.

Main code in [server.js](srv/server.js#L3)

# How to use
- launch cds with `cds run`
- call url http://localhost:4004/manualtx, this call use the manual tx
- call url http://localhost:4004/catalog/Books, a new book with title "new book title" should be there

# Notes
Pay attention, you have always to call tx.commit() or tx.rollback(), otherwise the tx keep pending and cap seems stop responding
