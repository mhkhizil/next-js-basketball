"use client";
import useBtnStore from "@/components/store/switchButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { GiBasketballBall } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useTeamStore from "../../components/store/teamDataStore";
import Modal from "./Modal";
export interface playerData {
  id: number;
  first_name: string;
  height_feet: null;
  height_inches: null;
  last_name: string;
  position: string;
  team: object;
  weight_pounds: null;
}
interface TeamData {
    id: number;
    team_name: string;
    country: string;
    region: string;
  }
  
const PlayersDataShowing = () => {
  const { teamData,createTeamData } = useTeamStore();
  const[team,setTeam]=useState("");
  const[region,setRegion]=useState("");
  const[country,setCountry]=useState("");
  const handleTeamCreate=(e:FormEvent)=>{
    e.preventDefault();
    if (!team && !region && !country) return;
    const newTeamData={
        id:Date.now(),
        team_name:team,
        country:country,
        region:region
    };
    createTeamData(newTeamData);
    setTeam('');
    setCountry('');
    setRegion('');
  }
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

  const openCreateTeamModal = () => {
    setIsCreateTeamModalOpen(true);
  };

  const closeCreateTeamModal = () => {
    setIsCreateTeamModalOpen(false);
  };

  const { button1State, button2State } = useBtnStore();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["playerData"],
    queryFn: async () => {
      const fetching = await fetch("https://www.balldontlie.io/api/v1/players");
      const data = await fetching.json();
      console.log(data);

      return data?.data as playerData[];
    },
  });
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>There was soem error while loading</div>;
  return (
    <>
      {button1State && (
        <div className=" max-h-screen   overflow-auto flex-1 items-center justify-center ">
          <h2 className=" text-2xl text-center text-black font-extrabold tracking-widest">
            Players
          </h2>
          <div className=" flex-col justify-evenly items-center  ">
            {data?.map((playerData) => {
              const { id, first_name, last_name, position } = playerData;
              return (
                <div
                  key={id}
                  className=" flex items-center justify-around bg-white rounded-xl shadow-xl my-5"
                >
                  <div>
                    <GiBasketballBall className=" m-2 text-5xl text-black" />
                  </div>
                  <div className="flex-1 items-center">
                    <div>
                      <h1 className=" px-1 text-black inline">{first_name}</h1>
                      <h1 className=" px-1 text-black inline">{last_name}</h1>
                      <h1 className=" px-1 text-black inline">{id}</h1>
                    </div>
                    <div>
                      <div>
                        <h1 className="m-2 rounded-lg shadow-md  bg-orange-400  w-8 text-center ">
                          <span className="text-black   mx-auto">
                            {position}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className=" px-3 flex items-center justify-around">
                    <IoIosAddCircleOutline className=" text-xl text-black" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {button2State && (
        <div className=" max-h-screen   overflow-auto flex-1 items-center justify-center ">
          <div className=" flex items-center justify-between">
            <h2 className=" text-2xl text-center text-black font-extrabold tracking-widest">
              Teams
            </h2>
            <button
              onClick={openCreateTeamModal}
              className="mx-2 text-black bg-orange-400 hover:bg-white  text-xl font-extrabold   rounded-xl shadow-xl b  px-3 py-2"
            >
              Create Team{" "}
            </button>
          </div>
          <div className=" flex-col justify-evenly items-center  ">
            {teamData?.map((data:TeamData) => {
              const { id, team_name, country, region } = data;
              return (
                <div
                  key={id}
                  className=" flex items-center justify-around bg-white rounded-xl shadow-xl my-5"
                >
                  <div>
                    <GiBasketballBall className=" m-2 text-5xl text-black" />
                  </div>
                  <div className="flex-1 items-center">
                    <div>
                      <h1 className=" px-1 text-black inline">{country}</h1>
                      <h1 className=" px-1 text-black inline">{region}</h1>
                     
                    </div>
                    <div>
                      <div>
                        <h1 className="m-2 rounded-lg shadow-md   w-8 text-center ">
                          <span className="text-black  font-extrabold text-2xl  mx-auto">
                            {team_name}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className=" px-3 flex items-center justify-around">
                    <IoIosAddCircleOutline className=" text-xl text-black" />
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            title={" Create Team"}
            isOpen={isCreateTeamModalOpen}
            onClose={closeCreateTeamModal}
          >
            {/* Content of the modal */}
           
            <form action="" onSubmit={handleTeamCreate}>
              <input
              onChange={(e)=>setTeam(e.target.value)}
              value={team}
                placeholder=" Team Name "
                type="text"
                className=" my-3 focus:border-orange-400 outline-none text-black rounded-md bg-slate-200  w-[80%] mx-auto block border "
              />
              <input
               onChange={(e)=>setCountry(e.target.value)}
              value={country}
                placeholder=" Country"
                type="Password"
                className="my-3 focus:border-orange-400 outline-none text-black   rounded-md bg-slate-200  w-[80%] mx-auto block  border "
              />
              <input
               onChange={(e)=>setRegion(e.target.value)}
              value={region}
                placeholder=" Region"
                type="Password"
                className="my-3 focus:border-orange-400 outline-none text-black   rounded-md bg-slate-200  w-[80%] mx-auto block  border "
              />
            <div className="my-3 w-full flex items-center justify-center">
            <button className="  text-black  bg-orange-400  hover:opacity-85 text-md font-extrabold   rounded-xl shadow-xl   px-3 py-2">
                Create
              </button>
            </div>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default PlayersDataShowing;
