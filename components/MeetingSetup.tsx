"use client";

import { useState, useEffect, use } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

interface MeetingSetupProps {
  setIsSetupComplete: (arg: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const handleJoinMeeting = () => {
    call?.join();
    setIsSetupComplete(true);
  };

  const call = useCall();
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }

    if (!call) throw new Error("Call not found");
  }, [isMicCamToggledOn, call?.camera, call?.microphone, call]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          <span>Turn off camera and microphone</span>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-blue-1 text-white px-4 py-2.5"
        onClick={handleJoinMeeting}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
