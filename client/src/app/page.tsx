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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-4">
      {data?.data?.map((car: ICarReq) => (
        <Link
          className="card"
          key={car.id}
          href={`/photos/${car?.media?.[0]?.path?.split("/")?.[1]}`}
          passHref
        >
          <CustomCard car={car} />
        </Link>
      ))}
    </div>
  );
};

export default page;
