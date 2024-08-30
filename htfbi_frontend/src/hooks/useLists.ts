import useData from "./useData.ts";

export interface AgentRole {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface User {
  username: string;
}

export interface List {
	id: number;
	name: string;
	description: string;
	agent_role: AgentRole;
	owner: User;
	updated_at: string;
	created_at: string;
}


const useLists = (listId?: number, method: 'get' | 'post' | 'patch' = 'get', requestData?: { name: string; description: string; agent_role_description: string; owner: number }) => {
  const endpoint = method === 'post'
    ? '/lists/lists/add_list/' // Use a different endpoint for POST
    : listId 
      ? `/lists/lists/${listId}/`
      : `/lists/lists/`;

  return useData<List | List[]>(endpoint, method, requestData);
}

export default useLists;
