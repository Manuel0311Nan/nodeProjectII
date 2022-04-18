import express from 'express';
import { God } from './models/God.js';
// import { connection } from './utils/db.js';

// import { characterRoutes } from './routes/character.routes.js';
// import { locationRoutes } from './routes/location.routes.js';

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello Gods from Asgard!');
});

router.get('/gods', async(req, res) => {
    try {
        const godList = await God.find()
        return res.status(200).json(godList)
    } catch (err) {
        return res.status(500).json(err);
    }
});
// //Búsqueda por Id, si el ususario mete un id válido se ejecuta el status 200
// //Si el usuario introduce un id no válido se ejecuta un status 404, error de usuario
// // si el programa en si diese un problema se ejecuta el catch y por tanto el error 500. 
// router.get('/gods/:id', (req, res) => {
//     const { id } = req.params;
//     try {
//         const god = await God.findById(id);
//         if (god) {
//             return res.status(200).json(god);
//         } else {
//             return res.status(404).json('No character found by this is');
//         }
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });
// router.get('/gods/:alias', (req, res) => {
//     const { alias } = req.params;
//     try {
//         const godByAlias = await God.find({ alias: alias });
//         if (godByAlias.length > 0) {
//             return res.status(200).json(godByAlias);
//         } else {
//             //${} --> "template strings", que le devuelve al usuario lo que ha intrdocido
//             return res.status(404).json(`No character found by this alias: ${alias}`);
//         }
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);

server.listen(PORT, () => {
    console.log(`Server running in http: //localhost:${PORT}`);
})