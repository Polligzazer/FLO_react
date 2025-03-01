function generateOTP(length: number = 6): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }
  return otp;
}

// Example usage:
const otp = generateOTP(6); // Generate a 6-digit OTP
console.log(otp); // Output: A random 6-character alphanumeric string