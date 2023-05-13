import { Router, Request, Response } from 'express';
import { ApiService } from '../classes/Api-service';
import Server from '../classes/Server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/api/xxxx', async (req: Request, res: Response)=>{
    res.json({
        ok: true,
        msg: "Tudo Beem"
    });
});

router.post('/api/connect-info', (req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instante;

    server.io.emit('mensaje-nuevo', {de, cuerpo});

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.post('/mensajes/:id', (req: Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instante;

    server.io.in( id ).emit('mensaje-privado', {de, cuerpo});

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instante;

    server.io.emit('general-usuarios', usuariosConectados.getLista());

    res.json({
        ok: true,
        ...usuariosConectados.getLista()
    })
})

export default router;
