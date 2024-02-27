import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate, Redirect, Switch } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import SignIn from "layouts/authentication/sign-in";
import routes from "routes";
// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import Login from "auth/login";
import Register from "auth/register";
import { AuthContext } from "context";
import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import { Helmet } from "react-helmet";
import Tables from "layouts/tables";
import SignUp from "layouts/authentication/sign-up";
import { Luv } from "Luv";
export default function App() {
  const { isAuthenticated } = useContext(AuthContext);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const [isDemo, setIsDemo] = useState(false);



  useEffect(() => {
    setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  }, []);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  
  const navigate = useNavigate();
 


  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
  
    allRoutes.map((route,ind) => {
      // console.log(route)
      // if (route.collapse) {
      //   return getRoutes(route.collapse);
      // }
      if(route.route=="/authentication/sign-in" || route.route=="/authentication/sign-up"){
        return(
          <>
            <Route
            
              exact
              path={route.route}
              element={
                route.component
              }
              key={route.key}
            />
          </>
        )
      }
      if (route.route && route.type !== "auth") {
        return (
          <>
          
            <Route
           
              exact
              path={route.route}
              
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                {route.component}
                </ProtectedRoute>
              }
              
              key={route.key}
            />
            
          </>
        );
      }
      return null;
    });


  return (
    <>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
             
            />
          </>
        )}

        <Routes>
          <Route
            exact
            path="user-profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserProfile />
              </ProtectedRoute>
            }
            key="user-profile"
          />
          
          <Route path="*" element={<Luv/>} />
          {getRoutes(routes)}
        </Routes>

      </ThemeProvider>
    </>
  );
}
