export const isValidDomain = (value: string): boolean => {
  const isIP = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value); // catches IPs
  const isLocalhost = /^(localhost|0\.0\.0\.0|127\.0\.0\.1)$/.test(value);
  const isNumeric = /^[0-9]+$/.test(value);
  const isSingleWord = /^[a-zA-Z0-9-]+$/.test(value) && !value.includes('.');

  const domainRegex =
    /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  return (
    domainRegex.test(value) &&
    !isIP &&
    !isLocalhost &&
    !isNumeric &&
    !isSingleWord
  );
}