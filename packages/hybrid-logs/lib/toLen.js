module.exports = (str, len) => {
  if (str.length > len) return;

  len -= str.length;
  str += ' '.str.repeat(len);

  return str;
};
