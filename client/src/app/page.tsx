import React from "react";
import Link from "next/link";
import { ICarReq } from "@/app/lib/interfaces/Car/car.interface";
import CustomCard from "./components/CustomCard";

async function getData() {
  const res = await fetch("http://localhost:3005/car/getAll");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  const data = await getData();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4">
        {data?.data?.map((car: ICarReq) => (
          <CustomCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default page;
