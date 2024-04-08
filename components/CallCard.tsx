import { Call, CallRecording } from "@stream-io/video-react-sdk";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

interface CallCardProps {
  meeting: Call | CallRecording;
  type: "upcoming" | "previous" | "recordings";
}
const CallCard = ({ meeting, type }: CallCardProps) => {
  console.log(meeting);
  return (
    <div className="bg-dark-3 w-full flex rounded-[14px] px-6 py-8 flex-col">
      <FaCalendarAlt className="h-6 w-6 text-white" />
      <h2></h2>
    </div>
  );
};

export default CallCard;
