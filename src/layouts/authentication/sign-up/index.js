/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useRef, useState } from "react";
import axios from "axios";
import { url } from "utils";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Icon } from "@mui/material";

function Cover() {

  const [rememberMe, setRememberMe] = useState(false);
  const [userDetails, SetUserDetails] = useState({
    email: "",
    password: "",
    name: ""
  })
  const [passwordValidation,SetpasswordValidation]=useState("")
  const [emailValidation, SetEmailValidation] = useState("")
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, SetShowAlert] = useState("")
  const [errMsg, SeterrMsg] = useState("")
  const navigate = useNavigate()

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleEmail = (e) => {
    // SetUserDetails({ ...userDetails, email: e.target.value })
    let val = regex.test(e.target.value)
    if (val) {
      SetUserDetails({ ...userDetails, email: e.target.value })
      SetEmailValidation("validated")
    } else {
      SetEmailValidation("notValidated")
    }
  }

  const handleName = (e) => {
    SetUserDetails({ ...userDetails, name: e.target.value })
  }
  const handlePassword = (e) => {
    let val=regexpass.test(e.target.value)
    if(val){
      SetUserDetails({ ...userDetails, password: e.target.value })
      SetpasswordValidation("validated")
    }else{
      SetpasswordValidation("notValidated")
    }
    // SetUserDetails({ ...userDetails, password: e.target.value })
  }
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}\.[a-z]{2,3}');
  let regexpass=new RegExp ('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailValidation=="validated" && passwordValidation=="validated") {
      if (isChecked) {
        axios.post(`${url}/user/signup`, userDetails).then((res) => {
          SetShowAlert("accountCreated")
          setTimeout(() => {
            navigate("/authentication/sign-in")
          }, 2000)
        }).catch((err) => {
          console.log(err)
          if (err.response.data.msg == "User Already Exists Please Login") {
            SeterrMsg("User Already Exists Please Login!")
            SetShowAlert("accountalreadycreated")
            setTimeout(() => {
              navigate("/authentication/sign-in")
            }, 2000)
          }
        })
      } else {
        SetShowAlert("checkBoxIsNotChecked")
        setTimeout(() => {
          SetShowAlert("")
        }, 2000)
      }
    }else{
      if(emailValidation=="notValidated"){
        SetShowAlert("emailincorrect")
      }else if(passwordValidation=="notValidated"){
        SetShowAlert("passwordincorrect")
      }
      
      setTimeout(()=>{
        SetShowAlert("")
      },2000)
    }

  }
  return (
    <CoverLayout image={"https://static.vecteezy.com/system/resources/previews/000/595/469/original/sound-wave-ilustration-logo-vector-icon.jpg"}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            {showAlert == "accountCreated" && <Alert style={{ marginBottom: "30px" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
              Account Created successful.
            </Alert>}
            {showAlert === "emailincorrect" && (
              <Alert style={{ marginBottom: "30px" }} severity="error">Entered Email is Not Valid!</Alert>
            )}
            {showAlert === "passwordincorrect" && (
              <Alert style={{ marginBottom: "30px" }} severity="error">Entered Password dose not matched the Criteria!</Alert>
            )}
            {showAlert == "accountalreadycreated" && <Alert style={{ marginBottom: "30px" }} severity="error">{errMsg}</Alert>}
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth onChange={handleName} required inputProps={{ required: true }} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={handleEmail} required inputProps={{ required: true }} />
              {emailValidation == "notValidated" ? <p style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}><Icon fontSize="small" color="inherit">error</Icon>Please Enter Valid Email!</p> : emailValidation == "validated" ? <p style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}><Icon fontSize="small" color="green">check</Icon>Email is valid</p> : null}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth onChange={handlePassword} required inputProps={{ required: true }} />
              {passwordValidation=="notValidated"?<p style={{color:"red",fontSize:"14px",display:"flex",alignItems:"center",gap:"5px"}}><Icon fontSize="small" color="inherit">error</Icon>Password Requires (a,A,@,1 Min.-8, Max.-20)!</p>:passwordValidation=="validated"?<p style={{color:"green",fontSize:"14px",display:"flex",alignItems:"center",gap:"5px"}}><Icon fontSize="small" color="green">check</Icon>Password is valid</p>:null}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox onChange={handleCheckboxChange} checked={isChecked} />
              {/* <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked} style={{border:"0.1px solid rgba(0, 0, 0, 0.4)",marginRight:"10px",marginLeft:"8px"}}/> */}
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>

            </MDBox>
            {showAlert == "checkBoxIsNotChecked" && <Alert style={{ marginBottom: "30px" }} severity="error">Please accept the terms and conditions!</Alert>}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth >
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
