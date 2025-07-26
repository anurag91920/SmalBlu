const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Create business profile
router.post('/', auth, async (req, res) => {
    try {
        const business = new Business({
            ...req.body,
            userId: req.userId
        });

        await business.save();
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get business profile by ID
router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id)
            .populate('userId', 'email businessName');
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all business profiles
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const businesses = await Business.find(query)
            .populate('userId', 'email businessName')
            .sort('-createdAt');
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update business profile
router.put('/:id', auth, async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Ensure user owns the business
        if (business.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        Object.assign(business, req.body);
        await business.save();
        res.json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete business profile
router.delete('/:id', auth, async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Ensure user owns the business
        if (business.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await business.remove();
        res.json({ message: 'Business deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
