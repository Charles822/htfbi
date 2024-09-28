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
import { LoaderCircle } from "lucide-react"
import { useInterval } from "../hooks/useInterval"
import { useState } from 'react';
 

const formSchema = z.object({
  youtube_url: z.string().url(),
})

type FormData = z.infer<typeof formSchema>;

interface Props {
	listId: number;
	// isSubmitted: (status: boolean) => void;
  onNoteCreated: () => void;
}


function NoteForm({ listId, onNoteCreated }: Props) {
  const [delay, setDelay] = useState(5000);
  // const [taskId, setTaskId] = useState<string | null>(null);
  const [taskIds, setTaskIds] = useState([]);

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


  // Notes hook
  const { execute, data, error, isLoading } = useNotes(undefined, undefined, 'post');

  // Polling logic
  useInterval(async () => {
  if (taskIds.length > 0) {
    for (const taskId of taskIds) {
      console.log('Checking taskId:', taskId);
      const response = await fetch(`http://127.0.0.1:8000/notes/notes/check_task_status/${taskId}/`, {
        method: 'GET',
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 'SUCCESS') {
        toast({ variant: "success", description: "Your note is ready!" });
        // Remove completed task ID from the array
        setTaskIds(prevTaskIds => prevTaskIds.filter(id => id !== taskId));
        // isSubmitted(true);
        onNoteCreated(); // Notify parent
      }
    }
    if (taskIds.length === 0) {
      setDelay(null); // Stop polling if no tasks left
    }
  }
}, delay);

  // useInterval(async () => {
  //   if (taskId) {
  //     console.log('yes, there is a taskId:', taskId);
  //     let response = await fetch(`http://127.0.0.1:8000/notes/notes/check_task_status/${taskId}/`, {
  //       method: 'GET',
  //     })
  //     let data = await response.json();
  //     console.log(data);
  //     if (data.status === 'SUCCESS') {
  //       toast({ variant: "success", description: "Your note is ready!" });
  //       setDelay(null); // Stop polling
  //       isSubmitted(true);
  //     }
  //   }
  // }, delay); 


  // Define a submit handler.
  const onSubmit = async (values: FormData) => {
    try {
      const owner = jwtDecode(localStorage.getItem('authTokens')).user_id;
      const note_data = {
        youtube_url: values.youtube_url, 
        note_list: listId, 
        owner
      };
    
      // Call the API to create a note
      const response = await execute(note_data);
      console.log(response)

      // Assume the response includes a task ID
      // setTaskId(response.taskId);
      setTaskIds(prevTaskIds => [...prevTaskIds, response.taskId])
      
      toast({ variant: "loading", description: "Your note is processing!" });
      reset();
      // isSubmitted(true);

    } catch (err) {
      console.error('Error creating note:', err.message);
      toast({ variant: "destructive", description: err.message });
      reset();
    }
  };

  return (
  	<>
	  	<div className='rounded-lg bg-background p-4 outline outline-gray-100'>
        <div className='items-start'>
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
  		                <Input disabled={isSubmitting} placeholder="Paste the link here" {...field} />
  		              </FormControl>
  		              <FormDescription>
  		                Copy the link of your youtube video and paste here. Then let the magic happen!
  		              </FormDescription>
  		              <FormMessage />
  		            </FormItem>
  		          )}
  		        />
              {isSubmitting ? <div><LoaderCircle className="animate-spin text-rose-700" /><a>The agent is working on your note...</a></div>  : <Button type="submit" disabled={isSubmitting || !isDirty || !isValid}>Submit</Button> }
  		        <Toaster />
  		      </form>
  		    </Form>
  	    </div>
      </div>
    </>
  )  

}

export default NoteForm