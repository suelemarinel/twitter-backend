function checkBody(body, keys) {
    if (!body) {
    return false;
  }
  
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };