import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await api.post(
        "/auth/google",
        {
          credential: credentialResponse.credential,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("Google login successful");

      navigate("/albums");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google Login Failed")}
      />
    </div>
  );
};
