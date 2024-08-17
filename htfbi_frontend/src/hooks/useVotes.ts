import useData from "./useData.ts";


export interface Vote {
	id: number;
	note: number;
	vote: Response;
	owner: number;
	user: number;
}

const useVotes = (listId?: number, noteId?: number, voteId?: number, userId?: number,  method: 'get' | 'post' | 'patch' = 'get', requestData?: any) => {
	const endpoint = method === 'post'
	? `/interactions/votes/add_vote/`
	: method === 'patch'
		? `/interactions/votes/${voteId}/patch_vote/`
		: `/interactions/votes/user_vote/?note=${noteId}&user=${userId}`;

	return useData<Vote>(endpoint);
	}

export default useVotes;

