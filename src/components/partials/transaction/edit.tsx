import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdOutlineEdit } from "react-icons/md";
import { ICategory } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/constants/validation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { IoReload } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { cleanedAmount, cn, formatNumber } from "@/lib/utils";
import { updateTransaction } from "@/actions/transaction";
import { PaymentMethod } from "@/types/payment-methods";

interface EditProps {
  uuid: string;
  category: ICategory;
  payment_method: PaymentMethod;
  type: string; // income | expense
  amount: number;
  description: string;
  date: string;
}

const Edit = ({ ...props }: EditProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(props.date),
      amount: formatNumber(props.amount.toString()),
      category_name: props.category.name,
      payment_method_name: props.payment_method?.name,
      description: props.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const payload = {
      amount: cleanedAmount(values.amount),
      category_name: values.category_name,
      payment_method_name: values.payment_method_name,
      description: values.description,
      date: values.date,
    };

    const result = await updateTransaction(payload, props.uuid);

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
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-2 h-6 rounded-sm rounded-r-none hover:text-amber-500"
          size="sm"
          variant="secondary">
          <MdOutlineEdit />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-0 gap-0 max-w-xl">
        <DialogHeader className="border-b px-8 h-16 flex justify-center">
          <DialogTitle className="font-light text-lg tracking-normal">
            Edit Transaction
          </DialogTitle>
        </DialogHeader>
        <div className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="h-[4.4rem] space-y-1">
                    <FormControl>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full h-11 rounded-sm pl-4 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown-buttons"
                            fromYear={1990}
                            toYear={2024}
                            initialFocus
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {
                  const handleChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const inputValue = e.target.value;
                    field.onChange(formatNumber(inputValue));
                  };

                  return (
                    <FormItem className="h-[4.4rem] space-y-1">
                      <div className="relative">
                        <div className="absolute text-muted-foreground left-4 pb-0.5 top-1/2 -translate-y-1/2">
                          Rp
                        </div>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Fill in the amount of ${
                              props.type === "income" ? "income" : "expenditure"
                            }`}
                            {...field}
                            value={field.value}
                            onChange={handleChange}
                            autoComplete="off"
                            className={`pl-10 rounded-sm focus-visible:ring-0 ${
                              form.formState.errors?.amount &&
                              "focus-visible:ring-destructive border-destructive"
                            }`}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem className="h-[4.4rem] space-y-1">
                    <FormControl>
                      <Input
                        placeholder="Category Name"
                        {...field}
                        autoComplete="additional-name"
                        className={`rounded-sm focus-visible:ring-0 ${
                          form.formState.errors?.category_name &&
                          "focus-visible:ring-destructive border-destructive"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_method_name"
                render={({ field }) => (
                  <FormItem className="h-[4.4rem] space-y-1">
                    <FormControl>
                      <Input
                        placeholder="ex: Cash, Mobile Banking, etc."
                        {...field}
                        autoComplete="additional-name"
                        className={`rounded-sm focus-visible:ring-0 ${
                          form.formState.errors?.category_name &&
                          "focus-visible:ring-destructive border-destructive"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="min-h-[5.5rem] space-y-1">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your description here."
                        className={`resize-none rounded-sm focus-visible:ring-0 ${
                          form.formState.errors?.description &&
                          "focus-visible:ring-destructive border-destructive"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs pb-1.5" />
                  </FormItem>
                )}
              />
              <div className="flex gap-x-1">
                <Button
                  type="submit"
                  className="w-full rounded-sm"
                  size="lg"
                  disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <IoReload className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : props.type === "income" ? (
                    "Edit Income"
                  ) : (
                    "Edit Expense"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    form.reset();
                  }}
                  className="w-fit rounded-sm"
                  size="lg">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
