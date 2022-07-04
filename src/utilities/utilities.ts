export const clamp = (value: number, minimum: number, maximum: number) => {
  return value < minimum ? minimum : value > maximum ? maximum : value
}
