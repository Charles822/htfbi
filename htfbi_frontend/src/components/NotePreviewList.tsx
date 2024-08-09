import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator";
import useNotes from "../hooks/useNotes"; 


const NotePreviewList = () => {
  const { data, error, isLoading } = useNotes(4);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || !Array.isArray(data)) return <p>No note available.</p>;
  
  return (
    <>
      <div>
        {data && data.map((note) => 
          <div key={note.id} className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle className="my-2 text-md">{note.video.title}</CardTitle>
                <CardDescription className="grid flex-1 gap-4  lg:grid-cols-2 xl:grid-cols-2 justify-between">
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
              <CardFooter className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-5 lg:grid-cols-5 xl:grid-cols-5">
                <span className="text-sm text-stone-600">{note.votes_count} Upvotes</span>
                <span className="text-sm text-stone-600">{note.comments_count} Comments</span>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default NotePreviewList










