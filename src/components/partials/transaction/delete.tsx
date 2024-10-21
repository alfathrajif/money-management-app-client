import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/actions/transaction";
import { IoReload } from "react-icons/io5";

const Delete = ({ uuid }: { uuid: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onDelete = async () => {
    setIsLoading(true);

    const result = await deleteTransaction(uuid);

    if (result.success) {
      toast({
        description: result.message,
        variant: "default",
      });
      setOpen(false);
      setTimeout(() => {
        setIsLoading(false);
        router.refresh();
      }, 500);
    } else {
      toast({
        title: result.message,
        description: result.errors,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 h-6 rounded-sm rounded-l-none hover:text-red-500"
          size="sm"
          variant="secondary">
          <MdOutlineDelete />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-0 gap-0 max-w-xl">
        <DialogHeader className="border-b px-8 h-16 flex justify-center">
          <DialogTitle className="font-light text-lg tracking-normal">
            Are you sure you want to delete this transaction?
          </DialogTitle>
        </DialogHeader>
        <div className="p-8 flex gap-x-1">
          <Button
            onClick={onDelete}
            variant="destructive"
            className="rounded-sm w-full"
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </div>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="rounded-sm w-fit"
            size="lg">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
