import mongoose from 'mongoose';

import { God } from '../models/God.js';


const godList = [{
        name: 'Odín',
        weapon: 'Gungnir',
        alias: 'Dios de Dioses',
        world: 'Asgard'
    },
    {
        name: 'Thor',
        weapon: 'Mjölnir',
        alias: 'Dios del Trueno',
        world: 'Asgard'
    },
    {
        name: 'Frigg',
        weapon: 'Sabedora de profecías',
        alias: 'Diosa del Amor',
        world: 'Midgard'
    },
    {
        name: 'Balder',
        weapon: 'Fuerza sobrehumana',
        alias: 'Dios de la Verdad',
        world: 'Midgard'
    },
    {
        name: 'Heimdall',
        weapon: 'Omnipresente',
        alias: 'Vigilante del Bifröst',
        world: 'Alfheim'
    },
    {
        name: 'Tyr',
        weapon: 'Tyrfing',
        alias: 'Dios de la Guerra',
        world: 'Vanaheim'
    },
];

const godListDocuments = godList.map(god => new God(god));

mongoose
    .connect('mongodb://localhost:27017/Gods', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async() => {
        const allGods = await God.find();
        if (allGods.length) {
            await God.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async() => {
        await God.insertMany(godListDocuments);
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => {
        mongoose.disconnect();
        console.log('OK!');
    });