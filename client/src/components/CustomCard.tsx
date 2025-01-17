import React from "react";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { ICarReq } from "../interface/car.interface";
import Link from "next/link";
import CustomProgress from "./CustomProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CustomAudio from "./CustomAudio";

type Props = {
  car: ICarReq;
};

const CustomCard = (props: Props) => {
  return (
    <Card key={props.car.id}>
      <CardHeader className="p-1">
        <div className="grid grid-cols-4 p-1 gap-1 border rounded-md bg-secondary">
          <div>
            <div>logo</div>
          </div>
          {props.car.media.some((media) => media.type.includes("audio")) ? (
            <div className="col-span-2">
              <p className="scroll-m-20 text-sm tracking-tight first:mt-0 truncate">
                {props.car.name}
              </p>
              <p className="scroll-m-20 text-sm tracking-tight">
                {props.car.plate}
              </p>
            </div>
          ) : (
            <div className="col-span-3">
              <p className="scroll-m-20 text-sm tracking-tight first:mt-0 truncate">
                {props.car.name}
              </p>
              <p className="scroll-m-20 text-sm tracking-tight">
                {props.car.plate}
              </p>
            </div>
          )}
          {props.car.media.map((media, index: number) => {
            if (media.type.includes("audio")) {
              return (
                <div key={index} className="flex justify-end">
                  <CustomAudio media={media} />
                </div>
              );
            }
          })}
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
                <p className="text-xl text-primary">{props.car.visualRating}</p>
              </div>
            </div>
            {props.car.media.some((media) => media.type.includes("image")) ? (
              <Image
                src={`http://localhost:3005/${
                  props.car.media[0].path.split("/")[1]
                }`}
                fill
                alt="car"
                style={{
                  objectFit: "cover",
                }}
                sizes="(max-width: 600px) 100vw, (min-width: 601px) and (max-width: 1024px) 33.3vw, (min-width: 1025px) 25vw"
              />
            ) : null}
          </div>

          <div className="absolute bottom-0 py-2 w-full flex flex-row gap-2 bg-secondary/50 hover:bg-secondary/75 rounded-b-lg">
            <div className="basis-1/3 flex flex-col">
              <CustomProgress
                statName="Acceleration"
                value={props.car.acceleration}
                maxValue={100}
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <CustomProgress
                statName="Top Speed"
                value={props.car.topSpeed}
                maxValue={400}
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <CustomProgress
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
