import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import useVotes from '../hooks/useVotes'
import { useState, useEffect } from "react"
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	noteId: number;
	userId: number;

}

const Vote = ({ children, noteId, userId }: Props) => {
	const [voteStatus, setVoteStatus] = useState(null);
	const { execute, data, error, isLoading } = useVotes(undefined, noteId, undefined, userId);

	useEffect(() => {
		const fetchData = async () => {
			await execute();
		}

		fetchData();

  }, []); // need to add depency execute in prod server


	useEffect(() => {
		if (data && data.vote)
			setVoteStatus(data.vote.vote);
    	
  }, [data]); // need to add depency execute in prod server
		
	const upColor = voteStatus === 1 ? 'red' : 'black';
  	const downColor = voteStatus === -1 ? 'red' : 'black';

	console.log(voteStatus)	
	return (
		<div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className='flex space-x-4'>
				<ArrowBigUp 
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