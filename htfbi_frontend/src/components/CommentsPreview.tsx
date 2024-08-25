import { MessageCircle }from "lucide-react"
import useComments from '../hooks/useComments'
import { ReactNode, useState, useCallback, useEffect } from "react"

interface Props {
	noteId: number;

}

const CommentsPreview = ({ noteId }: Props) => {
	const [commentCount, setCommentCount] = useState<number>(0);
	const { execute, data, error } = useComments(noteId, undefined, undefined, 'get', 'count'); // Fetch votes data

	
	// Fetch initial vote datas 
	const fetchCommentCount = useCallback(async () => {
	    try {
	      await execute();
	    } catch (error) {
	      console.error('Error fetching vote:', error);
	      setCommentCount(0); // or any default value
	    }
	}, [commentCount]);

	useEffect(() => {
	  fetchCommentCount();
	}, [fetchCommentCount]);


	useEffect(() => {
		if (data && data.comments_count) {
			setCommentCount(data.comments_count);	
		} else {
	    setCommentCount(0); // or any default value
	  }
  }, [data]); // need to add dependency execute in prod server

	console.log(commentCount);

	return (
		<div className="grid flex-1 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-3 xl:grid-cols-3">
			<div className="flex justify-center items-center flex-1">
				<MessageCircle
					color='grey'
					strokeWidth={1}
					size={20} />
			</div>
			<div className="flex justify-left items-left flex-1 text-sm text-stone-600" >{commentCount}</div>
		</div>
	)
}

export default CommentsPreview