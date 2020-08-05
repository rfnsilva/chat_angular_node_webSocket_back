import { Router, Request, Response } from 'express';

import { saveUser, login } from './controllers/AccountController';
import { getUser } from './controllers/UserController';
import { getGrupo, addGrupo, getGrupos } from './controllers/GrupoController';
import { getMensagens, addMensagem } from './controllers/MensagemController';

import cors from 'cors'
import { auth } from './middlewares/auth';

const routes = Router();

routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

routes.post('/register', saveUser);
routes.post('/login', login);

//middleware autenticacao
routes.use(auth);

routes.get('/user/:id', getUser);

routes.get('/grupos', getGrupos);
routes.post('/add_grupo', addGrupo);
routes.get('/grupo/:id', getGrupo);

routes.get('/mensagens', getMensagens);
routes.post('/add_mensagem', addMensagem);

export default routes;