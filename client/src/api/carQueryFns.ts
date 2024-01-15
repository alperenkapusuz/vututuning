import { http } from "@/config/axios";
import { END_POINTS } from "@/constants/end-points";
import { ICarBody } from "@/interface/body/car.interface";

export const createCarFn = async (value: ICarBody) => {
  const response = await http.POST<Response>(END_POINTS.CAR.CREATE, value);
  return response;
};
