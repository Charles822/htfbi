import useData from "./useData.ts";


export interface Vote {
	id: number;
	note: number;
	vote: Response;
	owner: number;
	user: number;
}

const useVotes = (listId: number, noteId: number, voteID: number, userID: number,  method: 'get' | 'post' | 'patch' = 'get', requestData?: any) => {
	const endpoint = `/lists/lists/${listId}/notes/${noteId}/votes/${voteId}/users/${userId}/add_vote`;
	return useData<Vote>(endpoint);
	}

export default useVotes;

