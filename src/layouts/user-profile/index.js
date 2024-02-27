import { useState, useEffect } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user-profile/Header";

import AuthService from "../../services/auth-service";
import axios from "axios";
import { url } from "utils";
import { useNavigate } from "react-router-dom";
import { Alert, Icon } from "@mui/material";

const UserProfile = () => {
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const [passwordValidation, SetpasswordValidation] = useState("")
  const [ConfirmpasswordValidation, SetConfirmpasswordValidation] = useState("")
  const [alertVar, SetAlert] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    newPassError: false,
    confirmPassError: false,
  });
  const loggedUser = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")


  let regexpass = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$')
  const getUserData = () => {
    // const response = await AuthService.getProfile();
    // if (response.data.id == 1) {
    //   setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
    // }
    // setUser((prevUser) => ({
    //   ...prevUser,
    //   ...response.data.attributes,
    //   currentPassword: "",
    //   newPassword: "",
    //   confirmPassword: "",
    // }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    if (e.target.name == "password") {
      let val = regexpass.test(e.target.value)
      if (val) {
        setUser({ ...user, password: e.target.value })
        SetpasswordValidation("validated")
      } else {
        SetpasswordValidation("notValidated")
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }


  };

  const submitHandler = async (e) => {
    if (passwordValidation == "validated") {
      if (user.password == user.confirm_password) {
        e.preventDefault();
        axios.patch(`${url}/admin/update/${loggedUser._id}`, user, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        }).then((res) => {
          localStorage.removeItem("user")
          localStorage.setItem("user", JSON.stringify(res.data.user))
          setNotification(true)
          setTimeout(() => {
            navigate("/audio")
          }, 2000)

        }).catch((err) => {
          console.log(err)
        })
      } else {
        e.preventDefault();
        SetAlert(true)
        setTimeout(() => {
          SetAlert(false)
        }, 2000)
      }
    } else {
      e.preventDefault();
      SetAlert("passwordincorrect")
    }

  };

  useEffect(() => {
    setUser({
      ...user,
      name: loggedUser.name
    })
    setUser({ ...user, email: loggedUser.email })
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={user.name}>
        {notification && (
          <MDAlert style={{ color: "green" }} mt="20px">
            <MDTypography variant="body2" color="white">
              Your profile has been updated
            </MDTypography>
          </MDAlert>
        )}
        {alertVar === "passwordincorrect" && (
          <Alert style={{ marginTop:"10px"}} severity="error">Entered Password dose not matched the Criteria!</Alert>
        )}
        {alertVar && <Alert style={{ marginBottom: "30px", marginTop: "20px" }} severity="error">Please Enter Same Password!</Alert>}
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Name
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="name"
                  fullWidth
                  name="name"
                  value={loggedUser.name}
                  onChange={changeHandler}
                  error={errors.nameError}
                  required inputProps={{ required: true }}
                />
                {errors.nameError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The name can not be null
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Email
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="email"
                  fullWidth
                  name="email"
                  value={loggedUser.email}
                  onChange={changeHandler}
                  error={errors.emailError}
                  disabled={true}
                  required inputProps={{ required: true }}
                />
                {errors.emailError && (
                  <MDTypography variant="caption" color="error" fontWeight="light">
                    The email must be valid
                  </MDTypography>
                )}
              </MDBox>
              {isDemo && (
                <MDTypography variant="caption" color="text" fontWeight="light">
                  In the demo version the email can not be updated
                </MDTypography>
              )}
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="column" mb={3}>
            <MDBox display="flex" flexDirection="row">
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                mr={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  New Password
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="password"
                    placeholder="New Password"
                    onChange={changeHandler}
                    error={errors.newPassError}
                    disabled={isDemo}
                    inputProps={{
                      autoComplete: "password",
                      form: {
                        autoComplete: "off",
                      },
                      required: true
                    }}
                    required
                  />
                  {passwordValidation == "notValidated" ? <p style={{ color: "red", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}><Icon fontSize="small" color="inherit">error</Icon>Password Requires (a,A,@,1 Min.-8, Max.-20)!</p> : passwordValidation == "validated" ? <p style={{ color: "green", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}><Icon fontSize="small" color="green">check</Icon>Password is valid</p> : null}
                  {errors.newPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The password must be of at least 8 characters
                    </MDTypography>
                  )}
                </MDBox>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                width="100%"
                ml={2}
              >
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Password Confirmation
                </MDTypography>
                <MDBox mb={1} width="100%">
                  <MDInput
                    type="password"
                    fullWidth
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={user.confirm_password}
                    onChange={changeHandler}
                    error={errors.confirmPassError}
                    disabled={isDemo}
                    inputProps={{
                      autoComplete: "confirm_password",
                      form: {
                        autoComplete: "off",
                      },
                      required: true
                    }}
                    required
                  />
                  {errors.confirmPassError && (
                    <MDTypography variant="caption" color="error" fontWeight="light">
                      The password confirmation must match the current password
                    </MDTypography>
                  )}
                </MDBox>
                {isDemo && (
                  <MDTypography variant="caption" color="text" ml={1} fontWeight="light">
                    In the demo version the password can not be updated
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
            <MDBox mt={4} display="flex" justifyContent="end">
              <MDButton variant="gradient" color="info" type="submit">
                Save changes
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default UserProfile;
