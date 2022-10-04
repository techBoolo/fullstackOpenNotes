export const reverse = (string) => {
  return string.split('').reverse().join('')
}

const reducer = (sum, item) => {
  return sum + item
}
export const average = (array) => {
  if(Array.isArray(array)) {
    return array.length === 0 ? 0 :  array.reduce(reducer, 0) / array.length
  }else {
    throw new Error('must be an array')
  }
}
