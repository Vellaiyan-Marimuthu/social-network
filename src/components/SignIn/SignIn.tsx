import SignInCard from "../Cards/SignInCard";
import logo from "./.././.././assets/Navbar/logo.svg";

import ipfsLogo from "./.././.././assets/Auth/ipfs-logo.svg";
import fileCoinLogo from "./../././.././assets/Auth/filecoin-logo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isRegistered")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <div className=" absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 text-center ">
            <div className="p-5 flex justify-between items-center  gap-10 top-0">
              <img src={ipfsLogo} alt="ipfs-logo" width="48px" height="48px" loading="lazy"></img>

              <img alt="app-logo" src={logo} width="100px" height="100px" loading="lazy"></img>
              <img
                alt="file coin logo"
                src={fileCoinLogo}
                width="38px"
                height="38px"
                loading="lazy"
              ></img>
            </div>
            <SignInCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
