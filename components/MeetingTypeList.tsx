"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  FaCalendarAlt,
  FaPlus,
  FaRegCheckCircle,
  FaVideo,
} from "react-icons/fa";
import MeetingCard from "./MeetingCard";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";

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
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
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
        title: "Meeting Created",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-4">
            <label>Add a description</label>
            <Textarea
              className="border-none resize-none  bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <label>Select a date and time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={<FaRegCheckCircle className="text-6xl text-green-500" />}
          buttonIcon={<MdOutlineContentCopy />}
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the meeting link"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
