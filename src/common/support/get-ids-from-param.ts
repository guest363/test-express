/**
 * Given a string of comma separated ids, return an array of those ids.
 * @param {string} param - string
 */
export const getIdsFromParam = (param: string) =>
  param.split(',').map((id) => id.trim());
