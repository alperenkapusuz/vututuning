"use client";
import { IMediaReq } from "@/interface/media.interface";
import { faVolumeHigh, faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  media: IMediaReq;
};

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  console.log("playing", playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const CustomAudio = (props: Props) => {
  const [playing, toggle] = useAudio(
    `http://localhost:3005/${props.media.path.split("/")[1]}`
  );

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    // You can add any custom logic here if needed
    if (typeof toggle === "function") {
      toggle();
    }
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleButtonClick}>
      {playing ? (
        <FontAwesomeIcon icon={faVolumeHigh} className="text-primary" />
      ) : (
        <FontAwesomeIcon icon={faVolumeOff} className="text-primary" />
      )}
    </Button>
  );
};

export default CustomAudio;
