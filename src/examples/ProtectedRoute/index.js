import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";

const ProtectedRoute = ({ isAuthenticated, redirectPath = "/authentication/sign-in", children }) => {
  const navigate=useNavigate()
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return navigate("/authentication/sign-in")
    //  <Navigate to={""}  />;
  }else{
    return children;
  }

  
};

export default ProtectedRoute;
