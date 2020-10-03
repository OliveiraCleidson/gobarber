import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import routes from './routes';

import '@shared/database';
import '@shared/container';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
