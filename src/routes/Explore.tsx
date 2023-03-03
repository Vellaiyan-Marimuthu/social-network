import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { MdOutlineScience } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import Notification from "../components/Cards/Notification";
import Post from "../components/Cards/Post";
import { getFeeds } from "../constants/AppConstants";
import banner from "./../assets/Explore/banner.png";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllFeeds();
  }, []);

  const getAllFeeds = async () => {
    const provider: any = window.ethereum;
    const web3: any = new Web3(provider);
    const userAccount = await web3.eth.getAccounts();
    const address = userAccount[0];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${getFeeds}${address}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== false) {
          setPosts(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="home-container flex flex-col w-full overflow-y-auto ">
      <div style={{ height: "90px" }}></div>
      <div className=" featured w-full border-b">
        <div className="m-auto flex w-full px-5 py-8 text-center sm:py-20 sm:text-left">
          <div className="flex flex-col space-y-3">
            <div className="text-3xl font-900 sm:text-4xl">Protocol Labs Social Network👋</div>
            <div className="sm:w-70">
              The Protocol Labs Network drives breakthroughs in computing to push humanity forward.
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-9 items-center text-gray-700 px-5 mt-6">
        <button className="flex gap-2 items-center p-2 rounded-lg bg-bgActive">
          <BiMenu fontSize={20} />
          Timeline
        </button>
        <button
          className="flex gap-2  items-center p-2 rounded-lg hover:bg-violet-200 d-none"
          onClick={() => getAllFeeds()}
        >
          <AiOutlineReload fontSize={23} />
          Reload
        </button>
      </div>

      <div className=" gap-6 mt-6 flex bg-white w-full px-5">
        <div className="w-full md:w-70 border rounded-lg ">
          {posts?.map((post: any, index: number) => {
            return <Post post={post} key={index + uuidv4()} />;
          })}
        </div>
        <div className="flex-col hidden md:flex md:w-30">
          <div className="border-orange-300	text-yellow-600 w-full bg-amber-100 rounded-lg">
            <Notification
              headerImg={<MdOutlineScience />}
              title={"Beta Warning"}
              description={
                "This Decentralized social network is still in the beta phase, things may break, please handle us with care."
              }
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .warning-container {
            border-color: rgb(253 186 116);
          }
          .featured {
            width: 100%;
            height: 300px;
            background: linear-gradient(90deg, #fff, #fff 10%, transparent),
              url(${banner});
            background-size: cover;
          }
          ::-webkit-scrollbar {
              width: 4px;
          }
  
          ::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px whitesmoke;
              border-radius: 10px;
          }
  
          ::-webkit-scrollbar-thumb {
              background: #c4d7e4;
              border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
              background: #b3df1;
          }
  
        `}
      </style>
    </div>
  );
};

export default Explore;
