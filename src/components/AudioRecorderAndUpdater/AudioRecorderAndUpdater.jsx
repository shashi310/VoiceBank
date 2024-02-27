import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import { AuthContext } from "context";
import axios from "axios";
import { url } from "utils";

const AudioRecorderAndUploader = () => {
  const [audioRecordings, setAudioRecordings] = useState([]);
  const [profanityDetected, setProfanityDetected] = useState(false);
  const {audios,Setaudios}=useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null);

  const checkForProfanity = async (blob) => {
    setProfanityDetected(false);
  };
  const token = localStorage.getItem("token")

  // getAudioData(audioRecordings)
  // if(uploadFile){
  //   uploadFileFunction()
  // }

  
    


  const handleRecordingComplete = (blob) => {
    const url = URL.createObjectURL(blob);
    const newAudioRecordings = [
      ...audioRecordings,
      { url, fileName: `Recording-${audioRecordings.length + 1}` },
    ];
    setAudioRecordings(newAudioRecordings);
    checkForProfanity(url);
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    const url = URL.createObjectURL(file);
    const newAudioRecordings = [
      ...audioRecordings,
      { url, fileName: file.name },
    ];
    setAudioRecordings(newAudioRecordings);
    checkForProfanity(url);
    addDatatoApi(file)
  };

 
  const addDatatoApi=(file)=>{
    const formData = new FormData();
    formData.append('audio', file);
    // console.log("file",file);
    // console.log("formData",formData.audio)

    axios.post(`${url}/voice/upload`,formData,{
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res)=>{
      window.location.reload("/audio");
    }).catch((err)=>{
    })
  }


  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* <Box
        p={4}
        mb={4}
        boxShadow={2}
        borderRadius="md"
        bgcolor="background.paper"
      >
        <Typography variant="subtitle1" mb={2}>
          Record Audio
        </Typography>
        <AudioRecorder
          onRecordingComplete={handleRecordingComplete}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          startLabel="Start Recording"
          stopLabel="Stop Recording"
          backgroundColor="#FFFFFF"
          foregroundColor="#000000"
        />
        {profanityDetected && (
          <Typography variant="body1" mt={2} color="error">
            Profanity detected in recorded audio!
          </Typography>
        )}
      </Box> */}

      <Box
        p={4}
        mb={4}
        boxShadow={2}
        borderRadius="md"
        bgcolor="background.paper"
      >
        <Typography variant="subtitle1" mb={2} style={{border:"none",padding:"5px 10px"}}>
          Upload Audio
        </Typography>
        <input type="file" accept="audio/*" onChange={handleAudioUpload}  />
        {profanityDetected && (
          <Typography variant="body1" mt={2} color="error">
            Profanity detected in uploaded audio!
          </Typography>
        )}
      </Box>

      {audioRecordings.map((recording, index) => (
        <Box
          key={index}
          mt={4}
          p={4}
          mb={4}
          boxShadow={2}
          borderRadius="md"
          bgcolor="#F5F5F5"
          minWidth="100px"
          maxWidth="700px"
        >
          <Typography>{recording.fileName}</Typography>
          <audio src={recording.url || URL.createObjectURL(recording.blob)} controls />
        </Box>
      ))}
    </Box>
  );
};

export default AudioRecorderAndUploader;
