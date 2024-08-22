import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import  { jwtDecode } from 'jwt-decode'
import useComments from '../hooks/useComments'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
 

const formSchema = z.object({
  text: z.string(),
})


type FormData = z.infer<typeof formSchema>;

interface Props {
	noteId: number;
	isSubmitted: (status: boolean) => void;
}


function CommentForm({ noteId, isSubmitted }: Props) {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting, isDirty, isValid } = formState;

  const { toast } = useToast();


  // Call useLists at the top level
  const { execute, data, error, isLoading } = useComments(undefined, undefined, 'post');


  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
    const user = jwtDecode(localStorage.getItem('authTokens')).user_id;
    const comment_data = {
      note: values.youtube_url, 
      text: listId, 
      user
    };

    // Call the API request here
    await execute(comment_data);

    if (error) {
      console.error('Error creating a new comment:', error);
    } else {
      console.log('Comment created successfully:', data);
      toast({variant: "success", description: "Your comment has been created successfully!"});
      reset();
      isSubmitted(true);
    }
  };

  return (
  	<>
	  	<div>
	  		<h3 className="text-lg font-bold">Post a new comment</h3>
		    <Form {...form} >
		      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
		        <FormField
		          control={form.control}
		          name="text"
		          render={({ field }) => (
		            <FormItem>
		              <FormLabel>New comment</FormLabel>
		              <FormControl>
		                <Input placeholder="Write your comment here..." {...field} />
		              </FormControl>
		              <FormMessage />
		            </FormItem>
		          )}
		        />
		        <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>Submit</Button>
		        <Toaster />
		      </form>
		    </Form>
	    </div>
    </>
  )  

}

export default CommentForm