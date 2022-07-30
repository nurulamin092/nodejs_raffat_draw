const router = require('express').Router();
const {
    sellBulkTicket,
    sellSingleTicket,
    findAll,
    findById,
    findByUsername
} = require('./controllers')

router.route('/t/:id').get(findById).put().delete()

router.route('/u/:username').get(findByUsername).put().delete()

router.post('/bulk', sellBulkTicket);
router.get('/draw');

router.route('/').get(findAll).post(sellSingleTicket)


module.exports = router;