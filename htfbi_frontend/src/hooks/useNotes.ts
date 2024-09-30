import useData from "./useData.ts";

export interface Video {
  title: string;
  channel_name: string;
  youtube_url: string;
  duration: string;
  original_language: string;
  published_at: string;
}

export interface Response {
  agent_response: string;
}


export interface User {
	username: string;
}

export interface Note {
	id: number;
	video: Video;
	response: Response;
	note_list: number;
	owner: User;
	comments_count: number;
	votes_count: number;
	created_at: string;
	slug: string;
}

const useNotes = (slug?: number, noteSlug?: number, method: 'get' | 'post' | 'patch' = 'get', requestData?: { youtube_url: string; note_list: number; owner: number }) => {
	const endpoint = method === 'post'
	? `/notes/notes/add_note/`
	: noteSlug 
		? `/notes/notes/${noteSlug}/`
		: `/lists/lists/${slug}/notes/`;
	
	return useData<Note | Note[]>(endpoint, method, requestData);
	}

export default useNotes;