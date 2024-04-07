"use client";
import { use, useState } from "react";
import { FaCalendarAlt, FaPlus, FaVideo } from "react-icons/fa";
import MeetingCard from "./MeetingCard";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({
          title: "Please select date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create a meeting");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to create a meeting",
      });
    }
  };
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
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
