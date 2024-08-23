import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Separator } from "@/components/ui/separator";
import useComments from "../hooks/useComments"; 
import  { jwtDecode } from 'jwt-decode';

interface Props {
  noteId: number;
  refreshList: boolean;
}

const CommentsList = ({ noteId, refreshList }: Props) => {
  const { execute, data, error, isLoading } = useComments(10, undefined, 'get', 'list');
  const userId = jwtDecode(localStorage.getItem('authTokens')).user_id;
  console.log(data);

  useEffect(() => {
    execute(); // Trigger fetching the comment list
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || !Array.isArray(data)) return <p>No comments available.</p>;
  
  return (
    <>
      <div >
        <h3 className="text-lg font-bold mb-6">Comments for this Note</h3>
        {data && data.map((comment) => 
          <div key={comment.id} className="mb-1">
            <Card>
              <CardHeader>
                <div className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm">
                  <span>From: @{comment.user}</span>
                  <span>At: {comment.created_at}</span>
                </div>
              </CardHeader>
                <CardContent className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm">
                  <p>{comment.text}</p>
                </CardContent>
              <CardFooter className="grid flex-1 gap-0 sm:px-6 sm:py-0 md:gap-0 lg:grid-cols-6 xl:grid-cols-6 mb-1">
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

export default CommentsList










