import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import useLists from "../hooks/useLists";
import NotePreviewList from  "./NotePreviewList";


const ListDetails = () => {
  const { data, error, isLoading } = useLists(4);
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No note available.</p>;

  return (
    <>
      <div className="my-2 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <h1 className="my-2 text-2xl font-bold">{data.name}</h1>
        <div className="px-2 grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm text-stone-600">
          <ul>
            <li>Purpose: {data.description}</li>
            <li>Agent Role: {data.agent_role.description}</li>
          </ul>
          <ul>
            <li>Note created by {data.owner}</li>
            <li>On: {data.created_at}</li>
          </ul>
        </div>
      </div>
      <NotePreviewList />
    </>
  )
}

export default ListDetails

  











