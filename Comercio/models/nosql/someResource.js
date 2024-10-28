const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const SomeResourceSchema = new mongoose.Schema(
    {
        title: {
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
            enum: ['category1', 'category2', 'category3'] // Define tus categorías
        },
        status: {
            type: String,
            default: 'active',
            enum: ['active', 'inactive', 'pending']
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        // Agrega más campos según tus necesidades
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Añadir soft delete
SomeResourceSchema.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('someResource', SomeResourceSchema);