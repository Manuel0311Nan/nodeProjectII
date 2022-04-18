import express from 'express';
import God from './models/God.js';
// import { connection } from './utils/db.js';

// connection();
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
        const gods = await God.find();
        console.log("ok")
        res.send(gods);
    } catch (err) {
        console.log("catch")
        return res.status(500).json(err);
    }
});
router.get('/gods/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const gods = await God.findById(id);
        if (gods) {
            return res.status(200).json(gods);
        } else {
            return res.status(404).json('No God found by this id');
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
router.get('/alias/:alias', async(req, res) => {
    const { alias } = req.params;

    try {
        const godByAlias = await God.find({ alias: alias });
        if (godByAlias.length > 0) {
            return res.status(200).json(godByAlias);
        } else {
            return res.status(404).json(`No character found by this alias: ${alias}`);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});


// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);

// Routes
// server.use('/characters', characterRoutes);
// server.use('/locations', locationRoutes);

// Error Control 404
// server.use('*', (req, res, next) => {
//     const error = new Error('Route not found');
//     error.status = 404;
//     next(error);
// });
// server.use((err, req, res, next) => {
//     return res.status(err.status || 500).json(err.message || 'Unexpected error');
// });


server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});