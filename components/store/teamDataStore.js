import { create } from "zustand";

const useTeamStore = create((set) => ({
    teamData: [{
        id:1,
        team_name:'abc',
        country:'def',
        region:'hij'
    }],
  
   createTeamData:(newTeamData)=>{
    set((state)=>{
        return {teamData:[...state.teamData,newTeamData]}
    })

   },
 
}));
export default useTeamStore