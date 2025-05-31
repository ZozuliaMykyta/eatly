import jwt from "jsonwebtoken";

interface GoogleCallbackParams {
  id: string;
  jwtSecureCode: string;
}

export function handleGoogleCallback({
  id,
  jwtSecureCode,
}: GoogleCallbackParams) {
  const payload = { id, jwtSecureCode };
  const authToken = jwt.sign(payload, process.env.SECRET_KEY!, {
    expiresIn: "1h",
  });

  return { authToken };
}
