import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ICarReq } from "@/app/lib/interfaces/Car/car.interface";
import { Slider } from "@/app/components/ui/slider";

import React from "react";
import { Label } from "./components/ui/label";

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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 p-4">
      {data.data.map((car: ICarReq) => (
        <Card key={car.id}>
          <CardHeader>
            <CardTitle>{car.name}</CardTitle>
            <CardDescription>{car.plate}</CardDescription>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
              <div>
                <Label htmlFor="acceleration">Acceleration</Label>
                <Slider
                  id="acceleration"
                  value={[car.acceleration]}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label htmlFor="topspeed">Top Speed</Label>
                <Slider
                  id="topspeed"
                  value={[car.topSpeed]}
                  max={400}
                  step={1}
                />
              </div>
              <div>
                <Label htmlFor="handling">Handling</Label>
                <Slider id="handling" value={[car.handling]} max={10} step={1} />
              </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default page;

/*
<Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
*/
