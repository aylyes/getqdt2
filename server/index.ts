import express from 'express';
import cors from 'cors';
import { jobsRouter } from './routes/jobs';
import { connectorsRouter } from './routes/connectors';
import { scenariosRouter } from './routes/scenarios';
import { authRouter } from './routes/auth';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/connectors', connectorsRouter);
app.use('/api/scenarios', scenariosRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});