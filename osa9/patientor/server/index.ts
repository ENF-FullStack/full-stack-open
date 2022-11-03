import express, { Request } from 'express';
import cors = require('cors');

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors<Request>());

const PORT = 3001;

app.get('/api/ping', (_req, res)=> {
    console.log('got pinged, sending pong');
    res.send('pong');
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});