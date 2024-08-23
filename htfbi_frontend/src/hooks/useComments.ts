import useData from "./useData.ts";


export interface Comment {
	id: number;
	note: number;
	text: string;
	user: number;
	created_at: string;
}

const useComments = (
	noteId?: number, 
	userId?: number,  
	method: 'get' | 'post' | 'patch' = 'get', 
	endpointType?: 'count' | 'list' = 'list', 
	requestData?: any) => {
	
	const endpoint = method === 'post'
	? `/interactions/comments/add_comment/`
	: method === 'patch'
		? `/interactions/comments/patch_comment/`
		: endpointType === 'count'
			? `/interactions/comments/comments_count/?note=${noteId}`
			: endpointType === 'owner'
				? `/interactions/votes/user_vote/?note=${noteId}&user=${userId}`
				: `/interactions/comments/?note=${noteId}`;

	return useData<Comment>(endpoint, method, requestData);
	}

export default useComments;
