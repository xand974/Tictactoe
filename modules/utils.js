const generateRandomId = () => {
  const ALPHABET = "azertyuiopqsdfghjklmwxcvbn123486975&-_";
  let id = "";
  while (id.length < 10) {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    id += ALPHABET[randomIndex];
  }
  return id;
};

export { generateRandomId };
