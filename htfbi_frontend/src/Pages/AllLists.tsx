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
import useLists from "../hooks/useLists"; 


function AllLists() {
  const { data, error, isLoading } = useLists();
  console.log(data);
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading lists: {error.message}</p>;

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max gap-4 items-start md:gap-8 lg:col-span-2">
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
                  <CardTitle>All Lists</CardTitle>
                  <CardDescription>
                    All Lists created by users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Description
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          AI Agent Role
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created by
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created on
                        </TableHead>
                        <TableHead className="text-right">Last Update</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.map((list) => 
                        <TableRow key={list.id} className="bg-accent">
                        <TableCell>
                          <div className="font-medium">{list.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {list.description}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            {list.agent_role.description}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {list.owner}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {list.created_at}
                        </TableCell>
                        <TableCell className="text-right">{list.updated_at}</TableCell>
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
    </>
  )
}

export default AllLists;
