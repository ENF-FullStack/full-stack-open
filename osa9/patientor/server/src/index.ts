import express from 'express';
import cors = require('cors');

import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res)=> {
    console.log('got pinged, sending pong');
    res.send('pong');
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});