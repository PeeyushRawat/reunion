const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true,'Please enter product price'],
        maxLength: [100, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true,'Please enter product description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    propertyType: {
        type: String,
        required: [true, 'Please select Property Type for this product'],
        enum: {
            values: [
                "Single-Family Home",
                "Condominium",
                "Apartment",
                "Townhouse",
                "Duplex",
                "Triplex",
                "Multi-Family Building",
                "Mobile Home",
                "Vacant Land",
                "Commercial Property",
                "Industrial Property",
                "Retail Space"
            ],
            message: 'Please select correct property type for property'
        }
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    availableFrom: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        required: [true, 'Please enter city for this property']
    },
    creadtedAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Product',propertySchema,);