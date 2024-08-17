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
import useNotes from '../hooks/useNotes'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
 

const formSchema = z.object({
  youtube_url: z.string().url(),
})


type FormData = z.infer<typeof formSchema>;

interface Props {
	listId: number;
	isSubmitted: (status: boolean) => void;
}


function NoteForm({ listId, isSubmitted }: Props) {
  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtube_url: '',
    },
  });

  const { control, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting, isDirty, isValid } = formState;

  const { toast } = useToast();


  // Call useLists at the top level
  const { execute, data, error, isLoading } = useNotes(undefined, undefined, 'post');


  // 2. Define a submit handler.
  const onSubmit = async (values: FormData) => {
    const owner = jwtDecode(localStorage.getItem('authTokens')).user_id;
    const note_data = {
      youtube_url: values.youtube_url, 
      note_list: listId, 
      owner
    };

    // Call the API request here
    await execute(note_data);

    if (error) {
      console.error('Error creating note:', error);
    } else {
      console.log('Note created successfully:', data);
      toast({variant: "success", description: "Your note has been created successfully!"});
      reset();
      isSubmitted(true);
    }
  };

  return (
  	<>
	  	<div>
	  		<h3 className="text-lg font-bold">Create a new Note in this List</h3>
		    <Form {...form} >
		      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
		        <FormField
		          control={form.control}
		          name="youtube_url"
		          render={({ field }) => (
		            <FormItem>
		              <FormLabel>Youtube Video Link</FormLabel>
		              <FormControl>
		                <Input placeholder="Paste the link here" {...field} />
		              </FormControl>
		              <FormDescription>
		                Copy the link of your youtube video and paste here. Then let the magic happen!
		              </FormDescription>
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

export default NoteForm