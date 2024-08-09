import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import useNotes from "../hooks/useNotes"; 


const NoteDetailsCard = () => {
  const { data, error, isLoading } = useNotes(4, 10);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No note available.</p>;
  
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
      <Card className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <CardHeader>
          <CardTitle className="my-2">{data.video.title}</CardTitle>
          <CardDescription className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between">
            <ul>
              <li>Channel: {data.video.channel_name}</li>
              <li>{data.video.youtube_url}</li>
              <li>Original language: {data.video.original_language}</li>
              <li>Published date: {data.video.published_at}</li>
            </ul>
            <ul>
              <li>Note created by {data.owner}</li>
              <li>On: {data.created_at}</li>
            </ul>
          </CardDescription>
        </CardHeader>
        <Separator className="my-2"/>
        <CardContent>
          <h3 className="my-2">Agent Response</h3>
          <p className="text-sm text-stone-600">{data.response.agent_response}</p>
        </CardContent>
        <CardFooter className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-5 lg:grid-cols-5 xl:grid-cols-5">
          <span>{data.votes_count} Upvotes</span>
          <span>{data.comments_count} Comments</span>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NoteDetailsCard










