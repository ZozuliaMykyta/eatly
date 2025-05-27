import type { Request, Response } from "express";

const handleError = (res: Response, err: string, errorDetails?: unknown) => {
  if (errorDetails instanceof Error) {
    console.error(errorDetails.message, errorDetails.stack);
  } else {
    console.error(errorDetails);
  }
  res.status(500).json({ error: err, details: errorDetails });
};

export default handleError;
