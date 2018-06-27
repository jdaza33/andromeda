import express from 'express'
import user from '../model/user'
const router = express.Router();

router.get('/', async (req, res) => {
    const aux = await (user.find());
    res.json(aux);
});

router.post('/', async (req, res) => {
    const aux = new user(req.body);
    await aux.save();
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Usuario guardado"
    });
});

router.put('/:id', async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, req.body);
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Usuario actualizado"
    });
});

router.delete('/:id', async (req, res) => {
    await user.findByIdAndRemove(req.params.id);
     //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Usuario eliminado"
    });
});

export default router

