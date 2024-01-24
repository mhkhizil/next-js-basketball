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
//    return { ...data, ...updateTeamData };

// If the id matches, it creates a new object by spreading the properties of both the existing data object and the updateTeamData object. This means it takes all the properties from data and overrides or adds properties from updateTeamData. This ensures that you are creating a new object with the updated values.
   editTeamData:(id,updateTeamData)=>{
    set((state)=>{
        const finalUpdatedData=state.teamData?.map((data)=>{
            if (data.id===id) {
                return {...data,...updateTeamData}
            }
            return data;
        });
        return {teamData:finalUpdatedData}
    })

   },
   deletePost:(id)=>{
    set((state)=>{
        const updatedTeamDataD=state.teamData.filter((data)=>data.id!=id);
        return {teamData:updatedTeamDataD};
    })
   }
 
}));
export default useTeamStore