import {ArrowBigUp, ArrowBigDown}from "lucide-react"
import useVotes from '../hooks/useVotes'
import { useState, useEffect } from "react"


import React from 'react'

const Vote = () => {
	const { execute, data, error, isLoading } = useVotes(undefined, 10, undefined, 1);

	useEffect(() => {
    let vote = execute(); // Trigger fetching the vote
    console.log(vote)
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading vote: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No vote available.</p>;
	
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