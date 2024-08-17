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
  const [listId, setListId] = useState(4);
  const [isSubmitted, setStatus] = useState(false);
  const { execute, data, error, isLoading } = useLists(listId);
  console.log(data);

  useEffect(() => {
    execute(); // Trigger fetching the list
    setStatus(false);
  }, [isSubmitted]); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No note available.</p>;

  return (
    <>
      <div className="my-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4 mb-10">
        <div className="col-span-1"></div>
        <div className="grid flex-1 col-span-3" >
          <h1 className="my-2 mb-10 text-2xl font-bold">{data.name}</h1>
          <h3 className="text-lg font-bold">About this List</h3>
          <div className="my-2 grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm text-stone-600">
            <ul>
              <li>Purpose: {data.description}</li>
              <li>Agent Role: {data.agent_role.description}</li>
            </ul>
            <ul>
              <li>List created by {data.owner}</li>
              <li>On: {data.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        <NoteForm isSubmitted={status => setStatus(status)} listId={listId} className="col-span-1" />
        <NotePreviewList listId={listId} />
      </div>
    </>
  )
}

export default ListDetails

  











