import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from "zod";
import { isFetchBaseQueryError } from "@/lib/error";




const FormSchema = z.object({
  name: z.string().min(6, {
    message: "Tour type must be 6 characters.",
  }),
});

export default function AddTourTypeModal() {
  const [addTourType] = useAddTourTypeMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: "",
      },
    });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      try {
        const res = await addTourType({ name: data.name }).unwrap();

        if (res.success) {
          toast.success("Tour Type Added");
          form.reset();
          setOpen(false);
        }
      } catch (err: unknown) {
        if (isFetchBaseQueryError(err)) {
          const message = (err.data as { message?: string })?.message;

          toast.error(message ?? "Unexpected error");
        } else {
          toast.error("Unexpected error");
        }
    }
  };
  return (
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            form.reset();
          }
        }}
      >
        <DialogTrigger render={<Button>Add Tour Type</Button>}></DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Add Tour Type</DialogTitle>
          </DialogHeader>

          <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Tour Type Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Tour Type Name"
                    value={field.value}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>

          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Cancel</Button>}
            ></DialogClose>
            <Button type="submit" form="add-tour-type">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
