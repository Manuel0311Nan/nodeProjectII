import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const godSchema = new Schema({
    name: { type: String, required: true },
    weapon: { type: String },
    alias: { type: String, required: true },
    world: { type: String },
}, {
    timestamps: true,
});

// Creamos y exportamos el modelo God
const God = mongoose.model('God', godSchema);

// export { God }
export default God