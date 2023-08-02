export const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.key(obj).forEach((e) => {
    if (allowedFields.includes(e)) newObj[e] = obj[e];
  });
  return newObj;
};
