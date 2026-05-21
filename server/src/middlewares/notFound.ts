import type { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
};

export default notFound;
