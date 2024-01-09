import React from "react";
import Image from "next/image";

const page = ({
  params: { id: photoId },
}: {
  params: { id: string };
}) => {

  return (
    <div className="fixed inset-0 bg-secondary/30 z-10">
      <div className="flex items-center h-full max-w-3xl mx-auto">
        <div className="relative w-full py-20 px-2 rounded-lg">
          <Image
            src={`http://localhost:3005/${photoId}`}
            width={1000}
            height={600}
            className="object-cover mx-auto"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
