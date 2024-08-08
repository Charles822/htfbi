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

export interface Note {
	id: number;
	video: Video;
	response: Response;
	owner: number;
	comments_count: number;
	votes_count: number;
	created_at: string;
}

const useNotes = (listId: number) => {
	const endpoint = `/lists/lists/${listId}/notes`;
	return useData<Note[]>(endpoint);
	}

export default useNotes;



