import { useParams } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import useLists from "../hooks/useLists"
import NotePreviewList from  "./NotePreviewList"
import NoteForm from './NoteForm'



const ListDetails = () => {
  const params = useParams<{listId: number}>();
  const [listId, setListId] = useState(params.listId);
  // const [isSubmitted, setStatus] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const { execute, data, error, isLoading } = useLists(listId);
  console.log(data);

  const handleNoteCreated = () => {
   setIsCreated(true); // to notify the NotepreviewList component;
  };

  useEffect(() => {
    execute(); // Trigger fetching the list
    // setStatus(false);
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No list available.</p>;

  return (
    <>
      <div className="my-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-1"></div>
        <div className="grid flex-1 col-span-3" >
          <h1 className="my-2 mb-10 text-2xl font-bold">{data.name}</h1>
          <h3 className="text-lg font-bold">About this List</h3>
          <div className=" grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm text-stone-600">
            <ul>
              <li className='mb-2'><a className='font-medium text-black'>Purpose:</a> {data.description}</li>
              <li><a className='font-medium text-black'>Agent Role:</a> {data.agent_role.description}</li>
            </ul>
            <ul className="lg:mx-auto">
              <li><a className='font-medium text-black'>List created by</a><a className='text-rose-700'> @{data.owner.username}</a></li>
              <li><a className='font-medium text-black'>On:</a> {data.updated_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <NoteForm onNoteCreated={handleNoteCreated} listId={listId} className="col-span-1" />
        <NotePreviewList listId={listId} isCreated={isCreated} reset={() => setIsCreated(false)}/>
      </div>
    </>
  )
}

export default ListDetails

  











