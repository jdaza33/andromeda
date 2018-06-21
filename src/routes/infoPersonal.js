import express from 'express'
import infoPersonal from '../model/infoPersonal'
const router = express.Router();

router.get('/', async (req, res) => {
    const aux = await (infoPersonal.find());
    res.json(aux);
});

router.post('/', async (req, res) => {
    const aux = new infoPersonal(req.body);
    await aux.save();
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Datos guardados"
    });
});

router.put('/:id', async (req, res) => {
    await infoPersonal.findByIdAndUpdate(req.params.id,req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Datos actualizados"
    });
});

router.delete('/:id', async (req, res) => {
    await infoPersonal.findByIdAndRemove(req.params.id);
    res.json({
        status: "Datos eliminados"
    });
});

export default router
