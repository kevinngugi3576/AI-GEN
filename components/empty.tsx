
import { useState, useEffect } from 'react'
import Image from 'next/image';

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          alt="empty"
          src="/empty.png"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};
