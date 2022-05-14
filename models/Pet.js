const { Schema, model } = require('mongoose');

const PetSchema = Schema({
        
    pet_type_id: {
        type: Schema.Types.ObjectId,
        ref: 'PetType',
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,       
    },
    description: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

// Override model salida
PetSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Pet', PetSchema);