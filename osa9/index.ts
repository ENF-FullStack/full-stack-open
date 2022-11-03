import express, { Request, Response } from 'express';
import { isArray } from 'util';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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

app.post('/exercise', (req: Request, res: Response) => {
  const { daily_exercise, target } = req.body as {
    daily_exercise: number[];
    target: number;
  };

  if (!daily_exercise || !target) {
    res.status(400).send({ error: 'Not enough args, check: post' });
  }

  if (Number.isNaN(target)) {
    res.status(400).send({ error: 'Not enough args, check: target' });
  }

  try {
    if (!isArray(daily_exercise)) throw new Error();

    daily_exercise.forEach((hour) => {
      if (Number.isNaN(hour)) throw new Error();
    });
  } catch (error) {
    res.status(400).send({
      error: 'malformed params, check: array'
    });
  }

  const result: {
    periodAmount: number;
    trainingDays: number;
    success: boolean;
    target: number;
    rating: number;
    average: number;
    rateDescr: string;
  } = calculateExercises(daily_exercise, target);

  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
