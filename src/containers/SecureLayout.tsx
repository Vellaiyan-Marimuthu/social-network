import { MetaMaskInpageProvider } from "@metamask/providers";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Web3 from "web3";
import Reload from "../components/Cards/Reload";
import Loading from "../components/Loading/Loading";

import Navbar from "../components/Navbar/Navbar";
import { getUser } from "../constants/AppConstants";
import { useUserContext } from "../context/UserContextProvider";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    web3?: any;
  }
}

const SecureLayout = () => {
  const { appState, appStatedispatch }: any = useUserContext();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [fetchUser, setFetchUser] = useState(false);

  if (!appState?.action?.user) {
    // setFetchUser(false);
  }

  // setTimeout(() => {
  //   // setRefresh(true);
  //   // setLoading(false);
  //   window.location.reload();
  // }, 5000);

  useEffect(() => {
    setLoading(true);
    setRefresh(true);
  }, []);

  const provider: any = window.ethereum;
  const web3: any = new Web3(provider);

  useEffect(() => {
    const getCurrentUser = async () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions: any = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const userAccount = await web3.eth.getAccounts();
      const address = userAccount[0];
      setAccount(address);

      if (address) {
        fetch(`${getUser}${address}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log("response status", result);
            if (result?.status === true) {
              const user = result.data;
              appStatedispatch({
                user,
              });
              setLoading(false);
              navigate("/home");
            } else {
              setLoading(false);
              navigate("/sign-in");
            }
          })
          .catch((error) => {
            navigate("/sign-in");
          });
      } else {
        navigate("/sign-in");
      }
    };
    getCurrentUser();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Navbar />
          <Loading />
          <Reload refreshStatus={refresh} />
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};
export default SecureLayout;
