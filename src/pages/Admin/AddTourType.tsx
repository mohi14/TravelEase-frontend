import AddTourTypeModal from "@/components/modules/admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTourTypeMutation,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { isFetchBaseQueryError } from "@/lib/error";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";

type TourTypeItem = { _id?: string; id?: string; name: string };

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  const [deleteTourType, { isLoading }] = useDeleteTourTypeMutation();

  const handleRemoveTourType = async (tourTypeId: string | undefined) => {
    const toastId = toast.loading("Removing...");

    try {
      const res = await deleteTourType(tourTypeId).unwrap();

      if (res?.success) {
        toast.success("Tour Type deleted", { id: toastId });
      }
    } catch (err: unknown) {
      if (isFetchBaseQueryError(err)) {
        const message = (err.data as { message?: string })?.message;

        toast.error(message ?? "Unexpected error", { id: toastId });
      } else {
        toast.error("Unexpected error", { id: toastId });
      }
    }
  };

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
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isLoading}
                    >
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
