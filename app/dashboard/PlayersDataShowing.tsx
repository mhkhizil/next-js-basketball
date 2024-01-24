"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { GiBasketballBall } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
import useTeamStore from "../../components/store/teamDataStore";
import Modal from "./Modal";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CircleLoader } from "react-spinners";
import { DiCelluloid } from "react-icons/di";
import useBtnStore from "@/components/store/switchButton";

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
  const { teamData, createTeamData, editTeamData, deletePost } = useTeamStore();
  const [team, setTeam] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isCreateSelectTeamModalOpen, setIsCreateSelectTeamModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredTeams:TeamData[] = teamData.filter((team:TeamData) =>
    team.team_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const openCreateTeamModal = () => {
    setIsCreateTeamModalOpen(true);
  };

  const closeCreateTeamModal = () => {
    setIsCreateTeamModalOpen(false);
  };
  //for team modal box select
  const openCreateSelectTeamModal = () => {
    console.log("Opening modal");

    setIsCreateSelectTeamModalOpen(true);
    console.log(isCreateSelectTeamModalOpen);
  };

  const closeCreateSelectTeamModal = () => {
    setIsCreateSelectTeamModalOpen(false);
  };
  //for team modal box select
  const handleTeamCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!team && !region && !country) return;
    const newTeamData = {
      id: Date.now(),
      team_name: team,
      country: country,
      region: region,
    };
    createTeamData(newTeamData);
    setTeam("");
    setCountry("");
    setRegion("");
    closeCreateTeamModal();
  };
  const editTeam = (id: number) => {
    const data = teamData?.filter((team: TeamData) => team?.id === id)[0];

    setTeam(data.team_name);
    setCountry(data.country);
    setRegion(data.region);
    setTeamId(data.id );
    setIsEdit(true);
    openCreateTeamModal();
  };
  const handleEditTeam = (e: FormEvent) => {
    e.preventDefault();
    if (!team && !region && !country) return;
    const updateTeamData = {
      id: teamId,
      team_name: team,
      country: country,
      region: region,
    };

    editTeamData(updateTeamData.id, updateTeamData);
    setTeam("");
    setCountry("");
    setRegion("");
    setIsEdit(false);
    closeCreateTeamModal();
  };
  const handleRemoveTeam = (id: number) => {
    if (confirm("Are you sure you wat to delete this team?")) {
      deletePost(id);
    }
  };

  const { button1State, button2State } = useBtnStore();
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["playerData"],
    queryFn: async () => {
      const fetching = await fetch("https://www.balldontlie.io/api/v1/players");
      const data = await fetching.json();

      return data?.data as playerData[];
    },
  });
  if (isLoading) return (
    <div className=" flex items-center justify-center w-[40%]  ">
      <CircleLoader color="#573204" />
    </div>
  );
  if (isError) return <div>There was soem error while loading</div>;
  return (
    <>
      {button1State && (
        <div className=" max-h-screen   overflow-auto flex-1 items-center justify-center w-[40%] ">
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
                    <h1
                      onClick={openCreateSelectTeamModal}
                      className="  cursor-pointer hover:opacity-75 p-1 rounded-xl bg-orange-400 text-xs text-black "
                    >
                      {" "}
                      Select Team
                    </h1>
                    {/* <IoIosAddCircleOutline className=" " /> */}
                  </div>
                </div>
              );
            })}
          </div>
          {/* modal for select team */}
          <Modal
            title={"Search Team"}
            isOpen={isCreateSelectTeamModalOpen}
            onClose={closeCreateSelectTeamModal}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search team"
              className=" p-3 text-black shadow-xl rounded-2xl bg-slate-200 border border-orange-400"
            />
            <h1 className=" text-orange-400 font-extrabold my-3">Teams</h1>
     <div className=" max-h-24 overflow-auto">
     {filteredTeams.map((filteredTeam) => (
    <div key={filteredTeam.id} className="  ">
      {/* Display information about the filtered team */}
      <p className=" text-black">{filteredTeam.team_name}</p>
      {/* Add additional information as needed */}
    </div>
  ))}
     </div>
          </Modal>
        </div>
      )}
      {button2State && (
        <div className=" max-h-screen   overflow-auto flex-1 items-center justify-center w-[40%] ">
          <div className=" flex items-center justify-between">
            <h2 className=" text-2xl text-center text-black font-extrabold tracking-widest">
              Teams
            </h2>
            <button
              onClick={openCreateTeamModal}
              className="mx-2 text-black bg-orange-400 hover:bg-white  text-xl font-extrabold   rounded-xl shadow-xl b  px-3 py-2"
            >
              Create Team
            </button>
          </div>
          <div className=" flex-col justify-evenly items-center  ">
            {teamData?.map((data: TeamData) => {
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
                      <span>
                        <FaLocationDot className=" font-light  text-black inline mx-1" />{" "}
                      </span>
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
                    <FaEdit
                      onClick={() => editTeam(id)}
                      className=" m-1 text-xl text-black cursor-pointer hover:opacity-70"
                    />
                    <MdDelete
                      onClick={() => handleRemoveTeam(id)}
                      className=" m-1 text-xl text-black cursor-pointer hover:opacity-70"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            title={isEdit ? "Edit team" : " Create Team"}
            isOpen={isCreateTeamModalOpen}
            onClose={closeCreateTeamModal}
          >
            {/* Content of the modal */}

            <form
              action=""
              onSubmit={isEdit ? handleEditTeam : handleTeamCreate}
            >
              <input
                onChange={(e) => setTeam(e.target.value)}
                value={team}
                placeholder=" Team Name "
                type="text"
                className=" my-3 focus:border-orange-400 outline-none text-black rounded-md bg-slate-200  w-[80%] mx-auto block border "
              />
              <input
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder=" Country"
                type="text"
                className="my-3 focus:border-orange-400 outline-none text-black   rounded-md bg-slate-200  w-[80%] mx-auto block  border "
              />
              <input
                onChange={(e) => setRegion(e.target.value)}
                value={region}
                placeholder=" Region"
                type="text"
                className="my-3 focus:border-orange-400 outline-none text-black   rounded-md bg-slate-200  w-[80%] mx-auto block  border "
              />
              <div className="my-3 w-full flex items-center justify-center">
                <button className="  text-black  bg-orange-400  hover:opacity-85 text-md font-extrabold   rounded-xl shadow-xl   px-3 py-2">
                  {isEdit ? "Edit" : "Create"}
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
