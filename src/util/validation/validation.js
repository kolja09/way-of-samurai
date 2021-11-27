export const required = (value) =>{
    if(value) return undefined
    return 'Field is required'
}

export const MaxLengthsCreator = (maxLengths) => (value) =>{
  if(value.length > maxLengths) return `Max lengths is ${maxLengths} symbol`
    return undefined
}