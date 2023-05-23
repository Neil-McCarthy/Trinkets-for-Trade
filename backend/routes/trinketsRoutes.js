const express = require('express');
const router = express.Router();
const trinketsController = require('../controllers/trinketsController')
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(trinketsController.getAllTrinkets)
    .post(trinketsController.createNewTrinket)
    .patch(trinketsController.updateTrinket)
    .delete(trinketsController.deleteTrinket)

module.exports = router;