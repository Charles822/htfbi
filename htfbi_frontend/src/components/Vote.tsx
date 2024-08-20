import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import useVotes from '../hooks/useVotes'
import { ReactNode, useState, useCallback, useEffect } from "react"

interface Props {
	children: ReactNode;
	noteId: number;
	userId: number;
	voteId: number;

}

const Vote = ({ children, noteId, userId, voteId }: Props) => {
	const [voteStatus, setVoteStatus] = useState<number | null>(null);
	const { execute, data, error } = useVotes(noteId, userId);
	const { execute: execute_patch } = useVotes(undefined, undefined, 'patch');
	const { execute: execute_post } = useVotes(undefined, undefined, 'post');
	
	
	const fetchData = useCallback(async () => {
	    try {
	      await execute();
	    } catch (error) {
	      console.error('Error fetching vote:', error);
	      setVoteStatus(null); // or any default value
	    }
	}, []);

	useEffect(() => {
	  fetchData();
	}, [fetchData]);


	useEffect(() => {
		if (data && data.vote) {
			setVoteStatus(data.vote.vote);	
		} else {
	    setVoteStatus(null); // Default if no vote
	  }
  }, [data]); // need to add dependency execute in prod server

    const updateVote = async (new_vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    setVoteStatus(new_vote_value); // Optimistically update state

	    const vote_data = {
	      id: data.vote.id,
	      vote: new_vote_value,
	    };

	    try {
	      await execute_patch(vote_data);
	    } catch (error) {
	      console.error("Error updating vote:", error);
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	    }
  	};


    const createVote = async (vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    setVoteStatus(vote_value); // Optimistically update state

	    const vote_data = {
	      note: noteId,
	      vote: vote_value,
	      user: userId,
	    };

	    try {
	      await execute_post(vote_data);
	    } catch (error) {
	      console.error("Error updating vote:", error);
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	    }
  	};

	const upColor = voteStatus === 1 ? 'red' : 'black';
  	const downColor = voteStatus === -1 ? 'red' : 'black';

	console.log(voteStatus)	
	return (
		<div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className='flex space-x-4'>
				<ArrowBigUp onClick={() => 
					voteStatus === 1 
						? updateVote(0) 
						: voteStatus === 0 
						? updateVote(1) 
						: createVote(1)
					}
					color={upColor}
					className="flex-1" />
					{children}
				<ArrowBigDown
					color={downColor} 
					className="flex-1" />
			</div>
		</div>
	)
}

export default Vote