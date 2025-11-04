import CryptoJS from "crypto-js";

export const getVerificationToken = function () {
  const token = CryptoJS.lib.WordArray.random(20).toString();

  const hashedToken = CryptoJS.SHA256(token).toString();

  const verificationTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return {
    token,
    hashedToken,
    verificationTokenExpire,
  };
};
