export function parseHashParameters(hash) {
  return hash
    .substring(1)
    .split("&")
    .reduce((params, keyValue) => {
      const [key, value] = keyValue.split("=");
      params[key] = value;
      return params;
    }, {});
}
