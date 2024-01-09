"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

type Props = {
  statName: string;
  value: number;
  maxValue: number;
};

const Stats = (props: Props) => {
  return (
    <div className="grid justify-items-center">
      <p className="text-xs mb-1 text-primary">{props.statName}</p>
      <CircularProgressbar
        value={props.value}
        text={`${props.value}`}
        minValue={0}
        maxValue={props.maxValue}
        styles={{
          // Customize the root svg element
          root: {
            width: "35px",
          },
          // Customize the path, i.e. the "completed progress"
          path: {
            // Path color
            // stroke: `rgba(62, 152, 199, ${percentage / 100})`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            // strokeLinecap: "butt",
            // Customize transition animation
            // transition: "stroke-dashoffset 0.5s ease 0s",
            // Rotate the path
            // transform: "rotate(0.25turn)",
            // transformOrigin: "center center",
            stroke: "#b2d57c",
            
          },
          // Customize the circle behind the path, i.e. the "total progress"
          trail: {
            // Trail color
            stroke: "#0d0d0d",
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            // strokeLinecap: "butt",
            // Rotate the trail
            // transform: "rotate(0.25turn)",
            // transformOrigin: "center center",

          },
          // Customize the text
          text: {
            // Text color
            fill: "#b2d57c",
            // Text size
            fontSize: "40px",
          },
          // Customize background - only used when the `background` prop is true
          background: {
          },
        }}
      />
    </div>
  );
};

export default Stats;
