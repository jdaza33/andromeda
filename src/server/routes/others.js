import express from 'express'
import user from '../model/user'
import infopersonal from '../model/infoPersonal'

const router = express.Router();

router.post('/newuser', async (req, res) => {
    const newInfoPersonal = new infopersonal({
        'name': req.body.name,
        'nit': req.body.nit,
        'email': req.body.email
    });
    await newInfoPersonal.save();

    const aux = await (infopersonal.find({'nit': req.body.nit}));
    const newUser = new user({
        'id_infopersonal': aux[0]._id,
        'username': req.body.username,
        'password': req.body.password,
        'ref': req.body.nit
    });
    await newUser.save();
    
    //TODO 
    // LOS MENSAJES SON DINAMICOS
    res.json({
        status: "Usuario creado"
    });
});


export default router