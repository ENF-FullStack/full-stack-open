const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number, printText: string) => {
  const bmi: number = weight / Math.pow(height / 100, 2)
  let result = ''

  if (bmi < 16) result = 'Underweight(severe)'
  if (bmi >= 16 && bmi < 16.9) result = 'Underweight(moderate)'
  if (bmi >= 17 && bmi < 18.4) result = 'Underweight(mild)'
  if (bmi >= 18.5 && bmi < 24.9) result = 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 29.9) result = 'Overweight(pre-obese)'
  if (bmi >= 30 && bmi < 34.9) result = 'Obese(Class I)'
  if (bmi >= 35 && bmi < 39.9) result = 'Obese(Class II)'
  if (bmi >= 40) result = 'Obese(Class III)'

  console.log(printText + result)
}

try {
  calculateBmi(height,weight, `Height: ${height}, Weight: ${weight}, BMI: `)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

export {}