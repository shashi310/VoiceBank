// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { MDDialogsDelete } from "components/MDDialogsDelete/MDDialogsDelete";
import "./authorsTable.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context";
import axios from "axios";
import { url } from "utils";
import { convertToCustomFormat } from "utils/dateCoverter";

export default function data() {
  const [showModal, setShowModal] = useState("");
  const [audioUrl, setAudioUrl] = useState('');
  const [audios,Setaudios]=useState([])
  const [loading, setLoading] = useState(false);
  // const [reloadValue,SetReloadValue]=useState(0 || Number(localStorage.getItem("reload")))
  // const {audios,getData}=useContext(AuthContext)
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
 

  const token = localStorage.getItem("token")
  // const reloadVariable=Number(localStorage.getItem("reload"))
  // SetReloadValue(reloadValue)

  const getData = () => {
    // console.log("1",url)
    axios.get(`${url}/voice`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then((res) => {
      // console.log("2 data",res.data)
      Setaudios(res.data.voices)
    }).catch((err) => {
      console.log(err)
      console.log("3 data",err)
    })
  }
  
  const playAudio = async (audio) => {
    try {
      setShowModal(audio._id);
      setLoading(true);
      const response = await axios.get(`${url}/voice/audio/${audio._id}`, {
        responseType: 'blob'
      });
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUr = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUr);
      console.log(audioUr)
      setLoading(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      setLoading(false);
    }
  };

  // console.log("added audio",audios)
  const user = JSON.parse(localStorage.getItem("user"))
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const closeModal = () => {
    setShowModal(false);
    setAudioUrl('');
  };
  useEffect(() => {
    getData()
  }, [])

  return {
    columns: [
      { Header: "no", accessor: "no", align: "left" },
      { Header: "audio", accessor: "audio", width: "30%", align: "left" },
      
      { Header: "Author", accessor: "author", align: "left" },
      { Header: "date / time", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: audios.map((ele,ind) => {
      return (
        {
          audio: <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}><button style={{ border: "none", backgroundColor: "transparent", fontWeight: "600", cursor: "pointer" }} onClick={() => playAudio(ele)}>Play</button>
            {showModal == ele._id && (
              <div className="modal">
                {loading ? (
                  <div>Loading...</div>
                ) :
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <audio controls>
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <button style={{ border: "none", backgroundColor: "transparent", fontWeight: "600", cursor: "pointer" }} onClick={closeModal}>Close</button>
                  </div>
                }
              </div>
            )}</div>
          ,
          no:<>{ind+1}</>,
          author: <Author name={user?.name.toUpperCase()} email={user?.email} />,

          date: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {convertToCustomFormat(ele.updatedAt)}
            </MDTypography>
          ),
          action: (
            <>
              <MDTypography component="a" mr={0.5} href="#" variant="caption" color="text" fontWeight="medium">
                Convert
              </MDTypography>
              /
              <MDDialogsDelete id={ele._id}/>
            </>
          ),
        }

      )
    })


  };
}
