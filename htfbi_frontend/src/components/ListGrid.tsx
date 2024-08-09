import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator";
import useLists from "../hooks/useLists"; 


const ListGrid = () => {
  const { data, error, isLoading } = useLists();
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and an array
  if (!data || !Array.isArray(data)) return <p>No lists available.</p>;
  
  return (
    <>
      <h1 className="my-2 px-6 text-2xl font-bold">All Lists</h1>
      <div>
        {data && data.map((list) => 
          <div key={list.id} className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1 mb-2">
            <Card>
              <CardHeader>
                <CardTitle className="my-2 text-md">{list.name}</CardTitle>
                <CardDescription className="grid flex-1 gap-4  lg:grid-cols-2 xl:grid-cols-2 justify-between">
                  <ul>
                    <li>Purpose: {list.description}</li>
                    <li>Agent Role: {list.agent_role.description}</li>
                  </ul>
                  <ul>
                    <li>Note created by {list.owner}</li>
                    <li>On: {list.created_at}</li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <CardFooter>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default ListGrid



