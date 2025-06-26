export const isValidEmail = (email: string) => {
  const regExEmail = /^[^\s@]+@[^\s@]+\.[^\@s]+$/;
  return regExEmail.test(email)
}