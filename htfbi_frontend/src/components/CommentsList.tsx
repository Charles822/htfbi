import { Button } from "@/components/ui/button"
import { X }from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useState, useCallback, useEffect } from "react"
import { Separator } from "@/components/ui/separator";
import useComments from "../hooks/useComments"; 
import { baseURL } from "../services/api-client";
import  { jwtDecode } from 'jwt-decode';

interface Props {
  noteId: number;
}

const CommentsList = ({ noteId }: Props) => { 
  const { execute, data, error, isLoading } = useComments(noteId, undefined, undefined, 'get', 'list');
  const token = localStorage.getItem('authTokens');
  const userId = token ? jwtDecode(token).user_id : null;

  const deleteComment = useCallback(async (commentId: number) => {
    console.log("Attempting to delete comment with ID:", commentId);
    try {
      const response = await fetch(`${baseURL}/interactions/comments/${commentId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authTokens')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Refresh the comments list after deletion
      execute();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }, []);


  useEffect(() => {
    execute(); // Trigger fetching the comment list
    console.log(data['comments'])
  }, []); // need to add depency execute in prod server

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data.comments || !Array.isArray(data.comments)) return <p>Be the first to comment on this note!</p>;

  const showButton = (comment_owner, element) => {
    if (comment_owner === userId)
      return element
  };

  
  return (
    <>
      <div >
        <h3 className="text-lg font-bold mb-6">Comments for this Note</h3>
        {data.comments && data.comments.map((comment) => 
          <div key={comment.id} className="mb-1">
            <Separator className='mb-2 my-2'/>
            <Card>
              <CardHeader>
                <div className="grid flex-1 gap-4 lg:grid-cols-7 xl:grid-cols-7 justify-between text-sm">
                  <span className="col-span-3 text-sm text-stone-600">From: <a className="text-rose-700"> @{comment.owner.username}</a></span>
                  <span className="col-span-3 text-sm text-stone-600">At: {comment.updated_at}</span>
                  <div className="flex justify-end items-center">
                  {showButton(comment.owner.id, (<Button 
                    variant="destructive" 
                    size="icon" 
                    className="p-01 w-4 h-4"
                    onClick={() => {
                    console.log("Delete button clicked, comment ID:", comment.id);
                    deleteComment(comment.id);
                  }} >
                    < X className="h-4 w-4" />
                  </Button>))}
                  </div>
                </div>
              </CardHeader>
                <CardContent className="grid flex-1 gap-4 lg:grid-cols-2 xl:grid-cols-2 justify-between text-sm">
                  <p className='text-sm text-stone-600'>{comment.text}</p>
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










