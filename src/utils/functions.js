
export const transformarDataBRparaUS = (data) => {
  const [day, month, year] = data.split('/');
  return `${year}-${month}-${day}`;
}

export const transformarDataUSparaBR = (data) => {
  const [year, month, day] = data.split('-');
  return `${day}/${month}/${year}`;
}
