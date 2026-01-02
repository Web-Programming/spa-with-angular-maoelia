const express = require('express');
const router = express.Router();
const housingController = require('../controllers/housingcontroller');
const { verifyToken } = require('../middleware/authMiddleware');

// Get my housing
router.get('/my', verifyToken, housingController.GetMyHousing);

// Get all housing
router.get('/', housingController.Index);

// Get housing by ID
router.get('/:id', housingController.GetById);

// Create new housing
router.post('/', verifyToken, housingController.Create);

// Update housing
router.put('/:id', verifyToken, housingController.Update);

// Delete housing
router.delete('/:id', verifyToken, housingController.Delete);

module.exports = router;
