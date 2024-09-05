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
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface Props {
  noteId: number;
  isDeleted: (update: boolean) => void;
  isSubmitted: boolean;
  resetSubmission: () => void;
  resetDeletion: () => void;

}

const CommentsList = ({ noteId, isDeleted, isSubmitted, resetSubmission, resetDeletion }: Props) => { 
  const { execute, data, error, isLoading } = useComments(noteId, undefined, undefined, 'get', 'list');
  const token = localStorage.getItem('authTokens');
  const userId = token ? jwtDecode(token).user_id : null;
  const { toast } = useToast();

  const deleteComment = useCallback(async (commentId: number) => {
    console.log("Attempting to delete comment with ID:", commentId);
    try {
      const response = await fetch(`${baseURL}/interactions/comments/${commentId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(token).access}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
        toast({variant: "destructive", description: "Your comment cannot be deleted at the moment!"});
      }

      isDeleted(true);
      // Refresh the comments list after deletion
      execute();

      setTimeout(() => {
      resetDeletion();
    }, 100); // Adjust the delay if necessary
      
      toast({variant: "success", description: "Your comment has been deleted successfully!"});
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }, []);


  useEffect(() => {
    execute(); // Trigger fetching the comment list
    resetSubmission();
    console.log(data['comments'])
  }, [isSubmitted]);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading note: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data.comments || !Array.isArray(data.comments)) return <p className=' text-sm text-gray-700'>Be the first to comment on this note!</p>;

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
            <Toaster />
          </div>
        )}
      </div>
    </>
  )
}

export default CommentsList










