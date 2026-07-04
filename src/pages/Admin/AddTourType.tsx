import AddTourTypeModal from "@/components/modules/admin/TourType/AddTourTypeModal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api"
import { isFetchBaseQueryError } from "@/lib/error"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

type TourTypeItem = { _id?: string; id?: string; name: string }

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined)
  const [deleteTourType, { isLoading }] = useDeleteTourTypeMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTourType, setSelectedTourType] = useState<TourTypeItem | null>(null)

  const openDeleteDialog = (tourType: TourTypeItem) => {
    setSelectedTourType(tourType)
    setIsDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedTourType(null)
  }

  const handleDelete = async () => {
    if (!selectedTourType) {
      return
    }

    const tourTypeId = selectedTourType._id ?? selectedTourType.id ?? selectedTourType.name

    try {
      const res = await deleteTourType(tourTypeId).unwrap()

      if (res?.success) {
        toast.success("Tour Type deleted")
        closeDeleteDialog()
      }
    } catch (err: unknown) {
      if (isFetchBaseQueryError(err)) {
        const message = (err.data as { message?: string })?.message

        toast.error(message ?? "Unexpected error")
      } else {
        toast.error("Unexpected error")
      }
    }
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: TourTypeItem) => (
              <TableRow key={item._id ?? item.id ?? item.name}>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => openDeleteDialog(item)}
                    disabled={isLoading}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            closeDeleteDialog()
          } else {
            setIsDeleteDialogOpen(true)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tour Type</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedTourType?.name ? `"${selectedTourType.name}"` : "this tour type"}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" onClick={closeDeleteDialog}>Cancel</Button>} />
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading || !selectedTourType}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
