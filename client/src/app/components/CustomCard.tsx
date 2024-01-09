import React from "react";
import { Slider } from "@/app/components/ui/slider";
import Image from "next/image";
import { Card, CardHeader } from "@/app/components/ui/card";
import { ICarReq } from "../lib/interfaces/Car/car.interface";
import { Label } from "./ui/label";
import Link from "next/link";

type Props = {
  car: ICarReq;
};

const CustomCard = (props: Props) => {
  return (
    <Card key={props.car.id}>
      <CardHeader className="p-2">
        <div className="flex flex-row justify-between align-middle border rounded-t-md p-2 border-secondary bg-secondary">
          <div className="relative h-12 w-12 ">
            <Image
              objectFit="contain"
              src={`http://localhost:3000/bmw-2.png`}
              fill
              alt="logo"
            />
          </div>
          <div className="">
            <h3 className="scroll-m-20 text-xl tracking-tight first:mt-0 text-primary">
              {props.car.name}
            </h3>
            <h4 className="scroll-m-20 text-sm tracking-tight">
              {props.car.plate}
            </h4>
          </div>
          <div className="">sound</div>
        </div>
      </CardHeader>
      <Link
        className="card"
        key={props.car.id}
        href={`/photos/${props.car?.media?.[0]?.path?.split("/")?.[1]}`}
        passHref
      >
        <div className="relative rounded-b-lg overflow-hidden border">
          <div className="absolute basis-1/2 top-0 right-0 rounded-bl-lg z-10 text-right p-1 bg-secondary/30">
            <h4 className="scroll-m-20 text-l tracking-tight">Visual Rating</h4>
            <h4 className="scroll-m-20 text-xl tracking-tight pr-3">
              {props.car.visualRating}
            </h4>
          </div>

          <div className="relative h-52 w-full">
            <Image
              objectFit="cover"
              src={`http://localhost:3005/${
                props.car.media[0].path.split("/")[1]
              }`}
              fill
              alt="supra"
            />
          </div>

          <div className="absolute bottom-0 px-2 py-4 w-full flex flex-row gap-3 bg-secondary/30 rounded-b-lg">
            <div className="basis-1/3 flex gap-2 flex-col">
              <Label htmlFor="acceleration">Acceleration</Label>
              <Slider
                id="acceleration"
                value={[props.car.acceleration]}
                max={100}
                step={1}
              />
            </div>
            <div className="basis-1/3 flex gap-2 flex-col">
              <Label htmlFor="topspeed">Top Speed</Label>
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
      </Link>
    </Card>
  );
};

export default CustomCard;
