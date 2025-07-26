const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Retail', 'Service', 'Technology', 'Manufacturing', 'Food & Beverage', 'Other']
    },
    website: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    logo: {
        type: String
    },
    services: [{
        name: String,
        description: String,
        price: Number
    }],
    socialLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'active'
    }
}, {
    timestamps: true
});

businessSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Business', businessSchema);
