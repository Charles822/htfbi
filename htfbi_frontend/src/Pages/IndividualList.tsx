import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import useLists from "../hooks/useLists"; 
import useNotes from "../hooks/useNotes"; 

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },  
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="youtube_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube URL</FormLabel>
              <FormControl>
                <Input placeholder="Paste your youtube link here" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )  

}


function IndividualList() {
  const { data, error, isLoading } = useLists(4);
  const { data: notes_data, error: notes_error, isLoading: notes_isLoading } = useNotes(4);
  // console.log(data);
  console.log(notes_data);
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  // Check if data is defined and not an array
  if (!data || Array.isArray(data)) return <p>No list available.</p>;

  if (notes_isLoading) return <p>Loading...</p>;
  if (notes_error) return <p>Error loading lists: {notes_error.message}</p>;

  // Check if data is defined and not an array
  if (!notes_data || !Array.isArray(notes_data)) return <p>No notes available.</p>;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
      <ProfileForm />
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Channel Name
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Published Date
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>
                  <span className="block mt-2">
                    Purpose: {data.description}
                  </span>
                  <span className="block mt-2">
                    Agent role: {data.agent_role.description}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Video title</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Channel Name
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Link
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Duration
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Original Lang
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Published at
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Votes
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Comments
                      </TableHead>
                      <TableHead className="text-right">Created at</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notes_data && notes_data.map((note) =>
                      <TableRow key={note.id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium">{note.video.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {note.video.channel_name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {note.video.youtube_url}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {note.video.duration}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {note.video.original_language}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {note.video.published_at}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {note.votes_count}
                      </TableCell>  
                      <TableCell className="hidden md:table-cell">
                        {note.comments_count}
                      </TableCell>                                            
                      <TableCell className="text-right">{note.created_at}</TableCell>
                    </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default IndividualList;
