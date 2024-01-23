"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { GiBasketballBall } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
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
const PlayersDataShowing = () => {
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
                    {" "}
                    <span className="text-black   mx-auto">{position}</span>
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
  );
};

export default PlayersDataShowing;
