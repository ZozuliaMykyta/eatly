import type { Request, Response } from "express";

const handleError = (
  res: Response,
  err: string,
  errorDetails?: unknown,
  number: number = 500
) => {
  if (errorDetails instanceof Error) {
    console.error(errorDetails.message, errorDetails.stack);
  } else {
    console.error(errorDetails);
  }
  res.status(number).json({ error: err, details: errorDetails });
};

export default handleError;
