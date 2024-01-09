import React from "react";
import Image from "next/image";

const page = ({
  params: { id: photoId },
}: {
  params: { id: string };
}) => {
  return (
    <div className="relative w-full py-20 px-2 rounded-lg">
        <Image
          src={`http://localhost:3005/${photoId}`}
          width={1000}
          height={600}
          className="object-cover mx-auto"
          alt="photo"
        />
    </div>
  );
};

export default page;
