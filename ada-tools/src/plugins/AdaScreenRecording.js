import React, { useState, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"; // or your preferred record icon

export const AdaScreenRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      let chunks = [];
      recorder.ondataavailable = (event) => chunks.push(event.data);

      recorder.start();
      setIsRecording(true);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        downloadRecording(blob);
        setIsRecording(false);
      };
    } catch (error) {
      console.error("Error starting screen recording: ", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current.getTracks().forEach((track) => track.stop());
  };

  const downloadRecording = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "MiradorRecording.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <IconButton
      aria-label="record"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? <StopIcon /> : <FiberManualRecordIcon />}
    </IconButton>
  );
};
