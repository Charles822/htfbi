import useData from "./useData.ts";


export interface Comment {
	id: number;
	note: number;
	text: string;
	user: number;
}

const useComments = (noteId?: number, userId?: number,  method: 'get' | 'post' | 'patch' = 'get', requestData?: any) => {
	const endpoint = method === 'post'
	? `/interactions/comments/add_comment/`
	: method === 'patch'
		? `/interactions/comments/patch_comment/`
		: noteId
		? `/interactions/comments/comments_count/?note=${noteId}`
		: `/interactions/comments/?note=${noteId}`;

	return useData<Comment>(endpoint, method, requestData);
	}

export default useComments;

