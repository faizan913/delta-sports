const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactus.controller')

router.get('/contacts', contactController.findAll)
router.post('/contacts', contactController.create)
router.get('/contacts/:id', contactController.findById)
router.put('/contacts/:id', contactController.update)
router.delete('/contacts/:id', contactController.delete)

module.exports = router