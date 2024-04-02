import React from "react";

type MeetingProps = {
  id: string;
};

const Meeting = ({ params }: { params: MeetingProps }) => {
  return <div>Meeting room: #{params.id}</div>;
};

export default Meeting;
