import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import useVotes from '../hooks/useVotes'
import { useState, useEffect } from "react"


const Vote = () => {
	const [voteStatus, setVoteStatus] = useState(null);
	const { execute, data, error, isLoading } = useVotes(undefined, 10, undefined, 1);

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
		

	console.log(voteStatus)	
	return (
		<div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-10 xl:grid-cols-10">
			<div className='flex space-x-4'>
				<ArrowBigUp className="flex-1" />
				<ArrowBigDown className="flex-1" />
			</div>
		</div>
	)
}

export default Vote