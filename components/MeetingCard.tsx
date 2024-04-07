"use client";
import React from "react";

type MeetingTypeListProps = {
  color: string;
  title: string;
  desciption: string;
  icon: React.ReactNode;
  handleClick: () => void;
};

const MeetingCard = ({
  color,
  title,
  desciption,
  icon,
  handleClick,
}: MeetingTypeListProps) => {
  return (
    <div
      onClick={handleClick}
      className={`group ${color} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
    >
      <div className="flex items-center justify-center glassmorphism size-12 rounded-[10px] group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{desciption}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
