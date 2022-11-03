type centimeter = number
type kilogram = number

function calculateBmi(height: centimeter, weight: kilogram): string {
  const bmi = weight / Math.pow(height / 100, 2)
  let result = ''

  if (bmi < 16) result = 'Underweight(severe)'
  if (bmi >= 16 && bmi < 16.9) result = 'Underweight(moderate)'
  if (bmi >= 17 && bmi < 18.4) result = 'Underweight(mild)'
  if (bmi >= 18.5 && bmi < 24.9) result = 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 29.9) result = 'Overweight(pre-obese)'
  if (bmi >= 30 && bmi < 34.9) result = 'Obese(Class I)'
  if (bmi >= 35 && bmi < 39.9) result = 'Obese(Class II)'
  if (bmi >= 40) result = 'Obese(Class III)'

  console.log(`Height: ${height}, Weight: ${weight}, BMI: ` + result)
  return result
}

export { calculateBmi }

interface MultiValues {
  height: centimeter
  weight: kilogram
}

const parseBmi = (args: Array<string>): MultiValues => {
  if (args.length < 4) throw new Error('Not enough args')
  if (args.length > 4) throw new Error('Too many args')

  if (Number.isNaN(args[2]) || Number.isNaN(args[3])) {
    throw 'Gave NaN inputs, both height and weight need to be numbers!'
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }
}

try {
  const { height, weight } = parseBmi(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error) {
  if (error instanceof Error) console.log('Error: ', error.message)
}

// if (process.argv.length > 2) {
//   console.log(parseBmi(process.argv[2], process.argv[3]))
// }
