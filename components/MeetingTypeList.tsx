"use client";
import { useState } from "react";
import { FaCalendarAlt, FaPlus, FaVideo } from "react-icons/fa";
import MeetingCard from "./MeetingCard";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        handleClick={() => setMeetingState("isInstantMeeting")}
        color="bg-orange-1"
        icon={<FaPlus className="text-white text-3xl" />}
        title="New Meeting"
        desciption="Start an instant meeting"
      />
      <MeetingCard
        handleClick={() => setMeetingState("isScheduleMeeting")}
        color="bg-blue-1"
        icon={<FaCalendarAlt className="text-white text-3xl" />}
        title="Schedule Meeting"
        desciption="plan your meeting"
      />
      <MeetingCard
        handleClick={() => router.push("/recordings")}
        color="bg-purple-1"
        icon={<FaVideo className="text-white text-3xl" />}
        title="View Recordings"
        desciption="Check your recordings"
      />
      <MeetingCard
        handleClick={() => setMeetingState("isJoiningMeeting")}
        color="bg-yellow-1"
        icon={<IoMdPersonAdd className="text-white text-3xl" />}
        title="Join Meeting"
        desciption="via invitation link"
      />
    </section>
  );
};

export default MeetingTypeList;
