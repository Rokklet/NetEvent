import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

type AsyncController<TRequest extends Request> = (
  req: TRequest,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export function asyncHandler<
  TRequest extends Request = Request
>(
  controller: AsyncController<TRequest>
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(
      controller(req as TRequest, res, next)
    ).catch(next);
  };
}