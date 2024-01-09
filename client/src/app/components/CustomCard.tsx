import React from "react";
import Image from "next/image";
import { Card, CardHeader } from "@/app/components/ui/card";
import { ICarReq } from "../lib/interfaces/Car/car.interface";
import Link from "next/link";
import Stats from "./Stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  car: ICarReq;
};

const CustomCard = (props: Props) => {
  return (
    <Card key={props.car.id}>
      <CardHeader className="p-1">
        <div className="flex flex-row justify-between align-middle border rounded-md p-2 bg-secondary">
          <div className="relative h-12 w-12 ">
            <div>logo</div>
          </div>
          <div className="">
            <h3 className="scroll-m-20 text-l tracking-tight first:mt-0">
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
        <div className="relative rounded-b-lg overflow-hidden p-1 ">
          <div className="relative h-52 w-full rounded-md overflow-hidden">
            <div className="absolute top-0 right-0 rounded-bl-lg z-10 text-right p-2 bg-secondary/50 hover:bg-secondary/75 ">
              <p className="scroll-m-20 text-sm tracking-tight text-primary">
                Visual Rating
              </p>
              <div className="pr-2 flex flex-row justify-end gap-1 align-middle">
                <FontAwesomeIcon icon={faStar} className="w-4 text-primary" />
                <p className="text-xl text-primary">
                  {props.car.visualRating}
                </p>
              </div>
            </div>
            <Image
              objectFit="cover"
              src={`http://localhost:3005/${
                props.car.media[0].path.split("/")[1]
              }`}
              fill
              alt="supra"
            />
          </div>

          <div className="absolute bottom-0 py-2 w-full flex flex-row gap-2 bg-secondary/50 hover:bg-secondary/75 rounded-b-lg">
            <div className="basis-1/3 flex flex-col">
              <Stats
                statName="Acceleration"
                value={props.car.acceleration}
                maxValue={100}
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <Stats
                statName="Top Speed"
                value={props.car.topSpeed}
                maxValue={400}
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <Stats
                statName="Handling"
                value={props.car.handling}
                maxValue={10}
              />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default CustomCard;
