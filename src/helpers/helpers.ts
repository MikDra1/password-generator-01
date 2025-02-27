import React from "react";

export const generatePassword = (
  length: number = 12,
  options: {
    numbers?: boolean;
    symbols?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
  } = {}
): string => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charPool = "";
  if (options.lowercase) charPool += lowercaseChars;
  if (options.uppercase) charPool += uppercaseChars;
  if (options.numbers) charPool += numberChars;
  if (options.symbols) charPool += symbolChars;

  return Array.from(
    { length },
    () => charPool[Math.floor(Math.random() * charPool.length)]
  ).join("");
};

export const checkStrength = (
  password: string,
  setStrength: React.Dispatch<React.SetStateAction<string>>
) => {
    const lengthCheck = /.{8,}/; // At least 8 characters
    const lowercaseCheck = /[a-z]/; // Contains lowercase letters
    const uppercaseCheck = /[A-Z]/; // Contains uppercase letters
    const numberCheck = /\d/; // Contains a number
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/; // Contains special characters
    const commonWordCheck = /(password|12345|qwerty|abc123)/i; // Common password checks
    const alphanumericSpecialCheck = /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/; // Letters, numbers, and special characters
    const mixedCaseCheck = /^(?=.*[a-z])(?=.*[A-Z])/; // Contains both uppercase and lowercase
    const noRepeatingCharsCheck = /([a-zA-Z0-9])\1{2,}/; // No repeating characters (e.g., "aaa" or "111")
  
    // Calculate password strength
    let strengthLevel = 0;
  
    if (lengthCheck.test(password)) strengthLevel++;
    if (lowercaseCheck.test(password)) strengthLevel++;
    if (uppercaseCheck.test(password)) strengthLevel++;
    if (numberCheck.test(password)) strengthLevel++;
    if (specialCharCheck.test(password)) strengthLevel++;
    if (!commonWordCheck.test(password)) strengthLevel++; // Avoid common words
    if (alphanumericSpecialCheck.test(password)) strengthLevel++; // Letters, numbers, and special characters
    if (mixedCaseCheck.test(password)) strengthLevel++;
    if (!noRepeatingCharsCheck.test(password)) strengthLevel++; // No repeating characters
  
    if (strengthLevel <= 2) {
      setStrength("too weak!");
    } else if (strengthLevel === 3 || strengthLevel === 4) {
      setStrength("weak");
    } else if (strengthLevel === 5 || strengthLevel === 6) {
      setStrength("medium");
    } else {
      setStrength("strong");
    }
};

export const getBarsToColor = (strength: string) => {
  switch (strength) {
    case "too weak!":
      return [true, false, false, false];
    case "weak":
      return [true, true, false, false];
    case "medium":
      return [true, true, true, false];
    case "strong":
      return [true, true, true, true];
    default:
      return [false, false, false, false];
  }
};
