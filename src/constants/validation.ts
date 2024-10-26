import { z } from "zod";

export const formSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  amount: z.string().min(1, "Amount is required"),
  category_name: z.string().min(1, "Category is required"),
  payment_method_name: z.string().min(1, "Payment Method is required"),
  description: z.string().min(1, "Description is required"),
});
