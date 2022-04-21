export type ValidatorType = (value: string) => string | undefined

export const required: ValidatorType = (value) => {
	if (value) return undefined
	return 'Field is required'
}

export const MaxLengthsCreator = (maxLengths: number): ValidatorType => (value) => {
	if (value.length > maxLengths) return `Max lengths is ${maxLengths} symbol`
	return undefined
}