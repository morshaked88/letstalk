"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CallCard from "./CallCard";
import { FaCalendarAlt, FaFolderOpen, FaVideo } from "react-icons/fa";
import { PlayIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface CallListProps {
  type: "upcoming" | "previous" | "recordings";
}

const CallList = ({ type }: CallListProps) => {
  const { upcomingCalls, endedCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

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

  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      };

      if (type === "recordings") {
        fetchRecordings();
      }
    } catch (e) {
      toast({ title: "Failed to fetch recordings" });
    }
  }, [type, callRecordings, toast]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 && !isLoading ? (
        calls.map((meeting: Call | CallRecording, i) => (
          <CallCard
            key={(meeting as Call).id}
            icon={
              type === "previous" ? (
                <FaFolderOpen className="h-6 w-6" />
              ) : type === "upcoming" ? (
                <FaCalendarAlt className="h-6 w-6" />
              ) : (
                <FaVideo className="h-6 w-6" />
              )
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "previous"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === "recordings" ? <PlayIcon /> : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
