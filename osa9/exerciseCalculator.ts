interface Output {
  periodAmount: number
  trainingDays: number
  success: boolean
  target: number
  rating: number
  average: number
  rateDescr: string
}

const calculateExercises = (exerciseLog: number[], target: number): Output => {
  const periodAmount = exerciseLog.length
  const trainingDays = exerciseLog.reduce(
    (total, day) => total + (day > 0 ? 1 : 0),
    0
  )

  const totalHours = exerciseLog.reduce((total, hours) => total + hours, 0)
  const average = totalHours / periodAmount
  const rating = average >= target + 0.5 ? 3 : average >= target ? 2 : 1
  let rateDescr = ''

  if (average === target) {
    rateDescr = 'Good job!'
  } else if (average > 0.75 * target) {
    rateDescr = 'Almost there, keep it up!'
  } else {
    rateDescr = 'You are a slob, get moving!'
  }

  return {
    periodAmount,
    trainingDays,
    success: average >= target,
    rating,
    rateDescr,
    target,
    average
  }
}

export const parseInputExercises = (targetRaw: any, exercisesRaw: any[]) => {
  if (!targetRaw || exercisesRaw.length === 0) throw 'Missing parameters!'

  const exerciseLog = exercisesRaw.map((arr) => parseFloat(arr))
  const target = parseFloat(targetRaw)

  if (Number.isNaN(target) || exerciseLog.some((arr) => isNaN(arr))) {
    throw 'NaN parameters!'
  }

  return calculateExercises(exerciseLog, target)
}

if (process.argv.length > 2) {
  const [, , target, ...exerciseLog] = process.argv
  console.log(parseInputExercises(target, exerciseLog))
}

// 2 1 0 2 4.5 0 3 1 0 4
// 1 3 0 2 4.5 0 3 1
