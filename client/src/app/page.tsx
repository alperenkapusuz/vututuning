import { Card } from "@/components/ui/card";
import { ICarReq } from "@/interfaces/Car/car.interface";
import React from "react";

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
    <div>
      {data.data.map((car: ICarReq) => {
        return <Card key={car.id}>{car.name}</Card>;
      })}
    </div>
  );
};

export default page;
