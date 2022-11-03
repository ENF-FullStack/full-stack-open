import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if (!height || !weight)
    res
      .status(400)
      .send({ error: 'Need height(cm) and weight(kg) as arguments' });

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).send({ error: 'NaN parameters!' });
  }

  const bmi: { height: number; weight: number; bmi: string } = {
    height: heightNumber,
    weight: weightNumber,
    bmi: calculateBmi(heightNumber, weightNumber)
  };

  res.json(bmi);
});

const PORT = 3002;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
