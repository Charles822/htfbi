import useData from "./useData.ts";

export interface AgentRole {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface List {
	id: number;
	name: string;
	description: string;
	agent_role: AgentRole;
	owner: number;
	updated_at: string;
	created_at: string;
}


const useLists = (listId?: number) => {
	const endpoint = listId ? `/lists/lists/${listId}` : `/lists/lists`;
	return useData<List | List[]>(endpoint);
	}

export default useLists;
