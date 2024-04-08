"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CallCard from "./CallCard";

interface CallListProps {
  type: "upcoming" | "previous" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
  const { upcomingCalls, endedCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "previous":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "upcoming":
        return "No upcoming calls";
      case "previous":
        return "No previous calls";
      case "recordings":
        return "No recordings";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, i) => (
          <CallCard key={i} meeting={meeting} type={type} />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
