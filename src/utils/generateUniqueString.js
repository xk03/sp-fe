export function generateUniqueString() {
  const timestamp = new Date().getTime();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let code = "";

  // Add two random alphabet characters
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];
  }

  // Add two random numbers
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    code += numbers[randomIndex];
  }

  // Add the last two digits of the timestamp
  code += timestamp.toString().slice(-2);

  return code;
}
