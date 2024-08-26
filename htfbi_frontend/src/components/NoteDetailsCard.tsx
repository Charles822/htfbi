import { useParams } from 'react-router-dom';

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
import  { jwtDecode } from 'jwt-decode';
import useNotes from "../hooks/useNotes";
import Vote from './Vote';
import CommentsPreview from './CommentsPreview';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';


const NoteDetailsCard = () => {
  const params = useParams<{noteId: number}>();
  const { execute, data: note, error, isLoading } = useNotes(undefined, params.noteId);
  const [isSubmitted, setStatus] = useState(false);
  const userId = jwtDecode(localStorage.getItem('authTokens')).user_id;
  console.log(note);

  useEffect(() => {
    execute(); // Trigger fetching the note
    setStatus(false);
  }, [isSubmitted]); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!note || Array.isArray(note)) return <p>No note available.</p>;
  
  return (
    <div className="grid flex-1 items-start justify-between gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
      <Card >
        <CardHeader>
          <CardTitle className="my-2">{note.video.title}</CardTitle>
          <CardDescription className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between">
            <ul>
              <li>Channel: {note.video.channel_name}</li>
              <li>{note.video.youtube_url}</li>
              <li>Original language: {note.video.original_language}</li>
              <li>Published date: {note.video.published_at}</li>
            </ul>
            <ul>
              <li>Note created by {note.owner}</li>
              <li>On: {note.created_at}</li>
            </ul>
          </CardDescription>
        </CardHeader>
        <Separator className="my-2"/>
        <CardContent>
          <h3 className="my-2">Agent Response</h3>
          <p className="text-sm text-stone-600">{note.response.agent_response}</p>
        </CardContent>
        <CardFooter className="grid flex-1 gap-0 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-6 xl:grid-cols-6 mb-1">
          <Vote noteId={note.id} userId={userId} ></Vote>
          <CommentsPreview noteId={note.id}></CommentsPreview>
        </CardFooter>
      </Card>
      <div className="grid flex-1 items-start justify-between gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2" >
        <CommentForm isSubmitted={status => setStatus(status)} noteId={note.id} />
      </div>
      <div className="grid flex-1 gap-4 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-3 xl:grid-cols-3" >
        <div className="grid flex-1 col-span-2" >
        <CommentsList noteId={note.id} />
      </div>
      </div>
    </div>
  )
}

export default NoteDetailsCard










