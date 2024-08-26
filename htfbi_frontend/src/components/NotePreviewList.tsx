import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect } from "react"
import { Separator } from "@/components/ui/separator";
import Vote from './Vote';
import CommentsPreview from './CommentsPreview';
import useNotes from "../hooks/useNotes"; 
import  { jwtDecode } from 'jwt-decode';

interface Props {
  listId: number;
}

const NotePreviewList = ({ listId }: Props) => {
  const { execute, data, error, isLoading } = useNotes(listId);
  const userId = jwtDecode(localStorage.getItem('authTokens')).user_id;
  console.log(data);

  useEffect(() => {
    execute(); // Trigger fetching the list
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || !Array.isArray(data) || data === []) return <p>No notes available.</p>;

  // Tell the users when there are no notes yet in a list
  function noNotesMessage() {
    if (data.length === 0) return <p>No notes available in this list yet.</p>;
  }
  

  return (
    <>
      <div className="col-span-3">
        <h3 className="text-lg font-bold mb-6">Notes in this List</h3>
        {noNotesMessage()}
        {data && data.map((note) => 
          <div key={note.id} className="mb-1">
            <Link to={`/note/${note.id}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="my-2 text-md">{note.video.title}</CardTitle>
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
                <CardFooter className="grid flex-1 gap-0 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-6 xl:grid-cols-6 mb-1">
                  <Vote noteId={note.id} userId={userId} ></Vote>
                  <CommentsPreview noteId={note.id}></CommentsPreview>
                </CardFooter>
              </Card>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default NotePreviewList










