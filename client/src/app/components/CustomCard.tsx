import React from "react";
import { Slider } from "@/app/components/ui/slider";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ICarReq } from "../lib/interfaces/Car/car.interface";
import { Label } from "./ui/label";

type Props = {
  car: ICarReq;
};

const CustomCard = (props: Props) => {
  return (
    <Card key={props.car.id}>
      <CardHeader className="basis-1/2 p-3">
        <div className="border rounded-md p-2 border-secondary">
          <h3 className="scroll-m-20 text-2xl tracking-tight first:mt-0">
            {props.car.name}
          </h3>
          <h4 className="scroll-m-20 text-xl tracking-tight">
            {props.car.plate}
          </h4>
        </div>
      </CardHeader>

      <div className="relative rounded-b-lg overflow-hidden border">
        <div className="absolute basis-1/2 top-0 right-0 rounded-bl-lg z-10 text-right p-2 bg-secondary/30">
          <h4 className="scroll-m-20 text-xl tracking-tight">
            Visual Rating
          </h4>
          <h4 className="scroll-m-20 text-3xl tracking-tight pr-3">
            {props.car.visualRating}
          </h4>
        </div>
        <div className="relative h-80 w-full ">
          <Image objectFit="cover" src="http://localhost:3000/supra.jpeg" fill alt="supra" />
        </div>
        <div className="absolute bottom-0 px-2 py-5 w-full flex flex-row gap-5 bg-secondary/30 rounded-b-lg">
          <div className="basis-1/3 flex gap-2 flex-col">
            <Label htmlFor="acceleration" >Acceleration</Label>
            <Slider
              id="acceleration"
              value={[props.car.acceleration]}
              max={100}
              step={1}
            />
          </div>
          <div className="basis-1/3 flex gap-2 flex-col">
            <Label htmlFor="topspeed" >Top Speed</Label>
            <Slider
              id="topspeed"
              value={[props.car.topSpeed]}
              max={400}
              step={1}
            />
          </div>
          <div className="basis-1/3 flex gap-2 flex-col">
            <Label htmlFor="handling">Handling</Label>
            <Slider
              id="handling"
              value={[props.car.handling]}
              max={10}
              step={1}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomCard;
