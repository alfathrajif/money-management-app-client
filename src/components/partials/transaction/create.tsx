"use client";
import { createTransaction } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/constants/validation";
import { useToast } from "@/hooks/use-toast";
import { cleanedAmount, cn, formatNumber } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAdd } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { z } from "zod";
import SelectedType from "./selected-type";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      amount: "0",
      category_name: "",
      payment_method_name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await createTransaction({
      type: type,
      amount: cleanedAmount(values.amount),
      category_name: values.category_name,
      payment_method_name: values.payment_method_name,
      description: values.description,
      date: values.date,
    });

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

    form.reset();
  }

  const autoFill = () => {
    const date = new Date(faker.date.recent({ days: 30 }));
    const amount = faker.number.int({
      min: 5000,
      max: 5000000,
      multipleOf: 5000,
    });

    const categoriesIncome = [
      "Salary",
      "Freelance Work",
      "Investment Returns",
      "Rental Income",
      "Business Revenue",
    ];

    const categoriesExpense = [
      "Food",
      "Rent",
      "Entertainment",
      "Transportation",
      "Subscriptions",
      "Groceries",
    ];

    const paymentMethods = ["Cash", "Mobile Banking", "Credit Card"];

    let category_name = faker.helpers.arrayElement(categoriesIncome);
    const payment_method_name = faker.helpers.arrayElement(paymentMethods);

    switch (type) {
      case "income":
        category_name = faker.helpers.arrayElement(categoriesIncome);
        break;
      case "expense":
        category_name = faker.helpers.arrayElement(categoriesExpense);
        break;
      default:
        break;
    }

    form.setValue("date", date);
    form.setValue("amount", formatNumber(amount.toString()));
    form.setValue("category_name", category_name);
    form.setValue("payment_method_name", payment_method_name);
    form.setValue("description", faker.lorem.sentences({ min: 1, max: 2 }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="h-11 w-11">
          <IoIosAdd className="text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-0 gap-0 max-w-xl">
        <DialogHeader className="border-b px-8 h-16 flex justify-center">
          <DialogTitle className="font-light text-lg tracking-normal">
            New {type === "income" ? "Income" : "Expense"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-8">
          <SelectedType type={type} setType={setType} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-x-5">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="h-[4.4rem] space-y-1 col-span-2">
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
                    <FormItem className="h-[4.4rem] space-y-1 col-span-2">
                      <div className="relative">
                        <div className="absolute text-muted-foreground left-4 pb-0.5 top-1/2 -translate-y-1/2">
                          Rp
                        </div>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Fill in the amount of ${
                              type === "income" ? "income" : "expenditure"
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
                        placeholder="ex: Salary, Freelance Work, etc."
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
                  <FormItem className="min-h-[5.5rem] space-y-1 col-span-2">
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter the description."
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
              <div className="flex gap-x-1 col-span-2">
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
                  ) : type === "income" ? (
                    "Add Income"
                  ) : (
                    "Add Expense"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    form.reset();
                    setType("income");
                  }}
                  className="w-fit rounded-sm"
                  size="lg">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 absolute -translate-x-1/2 -translate-y-1/2 top-4 left-1/2">
            <Button
              variant="destructive"
              type="button"
              size="lg"
              onClick={autoFill}
              className="w-full text-sm">
              Auto Fill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Create;
