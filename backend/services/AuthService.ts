import jwt from "jsonwebtoken";

interface callbackParams {
  id: string;
  jwtSecureCode: string;
}

export function handleCallback({ id, jwtSecureCode }: callbackParams) {
  const payload = { id, jwtSecureCode };
  const authToken = jwt.sign(payload, process.env.SECRET_KEY!, {
    expiresIn: "1h",
  });

  return { authToken };
}
