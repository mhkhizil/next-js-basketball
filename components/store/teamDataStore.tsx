import create from 'zustand';

interface TeamData {
  id: number;
  team_name: string;
  country: string;
  region: string;
}

interface TeamStore {
  teamData: TeamData[];
  createTeamData: (newTeamData: TeamData) => void;
  editTeamData: (id: number, updateTeamData: Partial<TeamData>) => void;
  deletePost: (id: number) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  teamData: [
    {
      id: 1,
      team_name: 'abc',
      country: 'def',
      region: 'hij',
    },
  ],

  createTeamData: (newTeamData) => {
    set((state) => {
      return { teamData: [...state.teamData, newTeamData] };
    });
  },

  editTeamData: (id, updateTeamData) => {
    set((state) => {
      const finalUpdatedData = state.teamData?.map((data) => {
        if (data.id === id) {
          return { ...data, ...updateTeamData };
        }
        return data;
      });
      return { teamData: finalUpdatedData };
    });
  },

  deletePost: (id) => {
    set((state) => {
      const updatedTeamDataD = state.teamData.filter((data) => data.id !== id);
      return { teamData: updatedTeamDataD };
    });
  },
}));

export default useTeamStore;
