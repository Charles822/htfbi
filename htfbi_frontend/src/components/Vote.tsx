import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import useVotes from '../hooks/useVotes'
import { ReactNode, useState, useCallback, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Props {
	noteId: number;
	userId: number;
	voteId: number;

}

const Vote = ({ noteId, userId, voteId }: Props) => {
	const [voteStatus, setVoteStatus] = useState<number | null>(null);
	const { execute, data, error } = useVotes(noteId, userId); // Fetch votes data
	const { execute: execute_patch } = useVotes(undefined, undefined, 'patch'); // update a vote
	const { execute: execute_post, data: new_vote_data } = useVotes(undefined, undefined, 'post'); // create a vote 
	const { execute: execute_votes_sum, data: votes_sum, error: votes_sum_error } = useVotes(noteId, undefined); // Get votes sum
	const [voteSum, setVoteSum] = useState<number>(0);
	const { toast } = useToast();

	console.log(voteStatus)
	
	// Fetch initial vote datas 
	const fetchData = useCallback(async () => {
	    try {
	      await execute();
	    } catch (error) {
	      console.error('Error fetching vote:', error);
	      setVoteStatus(null); // or any default value
	    }
	}, [voteStatus]);

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


	// Load initial & updated votes count

	useEffect(() => {
	  const fetchVoteSum = async () => {
	    try {
	      await execute_votes_sum();
	    } catch (votes_sum_error) {
	      console.error('Error fetching votes sum:', votes_sum_error);
	    }
	  };

	  fetchVoteSum();
	  
	}, [voteSum]);

	useEffect(() => {
		if (votes_sum && votes_sum.votes_sum) {
			setVoteSum(votes_sum.votes_sum)	
		} else {
	    setVoteSum(0) // Default if no vote
	  }
  }, [votes_sum]); // need to add dependency execute in prod server

	function check_login_status() {
    	const token = localStorage.getItem('authTokens');

		if (!token) {
			toast({ variant: "error", description: "Please log in to vote." });
		    return false;
		};

		return true;	
	}

    const updateVote = async (new_vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    const previousVoteSum = voteSum;
	    setVoteStatus(new_vote_value); // Optimistically update state

	    // Optimistically update VoteSum
	    (new_vote_value === 0 && voteStatus === 1)
	    	? setVoteSum(voteSum  => voteSum - 1)
	    	: (new_vote_value === 0 && voteStatus === -1)
	    		? setVoteSum(voteSum  => voteSum + 1)
	    		: setVoteSum(voteSum  => voteSum + (new_vote_value));

	    const vote_data = {
	      id: data.vote.id,
	      vote: new_vote_value,
	    };

	    try {
	      await execute_patch(vote_data);
	    } catch (error) {
	      console.error("Error updating vote:", error);
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	      setVoteSum(previousVoteSum); // Optionally, revert optimistic update
	    }
  	};


    const createVote = async (vote_value: number) => {
	    const previousVoteStatus = voteStatus;
	    const previousVoteSum = voteSum;
	    setVoteStatus(vote_value); // Optimistically update voteStatus 
	    (voteSum === 0 && vote_value === -1)
	    ? setVoteSum(0)
	    : setVoteSum(voteSum  => voteSum + (vote_value)); // Optimistically update VoteSum

	    const vote_data = {
	      note: noteId,
	      vote: vote_value,
	      owner: userId,
	    };

	    try {
	      await execute_post(vote_data);
	      if (new_vote_data)
	      	data = new_vote_data;
	    } catch (error) {
	      console.error("Error updating vote:", error);
	      setVoteStatus(previousVoteStatus); // Revert if there's an error
	      setVoteSum(previousVoteSum); // Optionally, revert optimistic update
	    }
  	};


	const upColor = voteStatus === 1 ? 'red' : 'black';
  	const downColor = voteStatus === -1 ? 'red' : 'black';

	return (
		<div className="grid flex-1 justify-center items-center gap-0 p-4 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-3 xl:grid-cols-3">
			<div className="flex justify-center items-center flex-1">
				<ArrowBigUp onClick={() => {
					if (!check_login_status()) return;
					voteStatus === 1 
						? updateVote(0) 
						: (voteStatus === 0 || voteStatus === -1)
						? updateVote(1) 
						: createVote(1)
					}}
					color={upColor}
					strokeWidth={1} />
			</div>
			<div className="flex justify-center items-center flex-1 text-sm text-stone-600" >{voteSum}</div>
			<div className="flex justify-center items-center flex-1">
				<ArrowBigDown onClick={() => {
					if (!check_login_status()) return;				
					voteStatus === -1 
						? updateVote(0) 
						: (voteStatus === 0 || voteStatus === 1)
						? updateVote(-1) 
						: createVote(-1)
					}}
					color={downColor} 
					strokeWidth={1} />
			</div>
			<Toaster />
		</div>
	)
}

export default Vote