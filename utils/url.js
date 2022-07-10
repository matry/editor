export const getParams = (search) => {
  const urlParams = new URLSearchParams(search)

  const result = {}

  urlParams.forEach((v, k) => {
    result[k] = v
  })

  return result
}
