import React from "react";
import { ICarReq } from "@/interface/car.interface";
import { END_POINTS } from "@/constants/end-points";
import CustomCard from "@/components/CustomCard";

async function getData() {
  const res = await fetch(END_POINTS.CAR.GET_ALL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  const data = await getData();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-14">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1 lg:gap-8 p-3">
        {data?.data?.data?.map((car: ICarReq) => (
          <CustomCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default page;
