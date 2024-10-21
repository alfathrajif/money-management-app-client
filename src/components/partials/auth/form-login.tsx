"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffSharp, IoEyeSharp, IoReload } from "react-icons/io5";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const FormLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await login({
      email: values.email,
      password: values.password,
    });

    if (result.success) {
      toast({
        description: result.message,
        variant: "default",
      });
      router.refresh();
    } else {
      toast({
        title: result.message,
        description: result.errors,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  const autoFillLogin = () => {
    const email = "testing@gmail.com";
    const password = "Password123";
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-[4.4rem] space-y-1">
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    autoComplete="email"
                    className={
                      form.formState.errors?.email &&
                      "focus-visible:ring-destructive border-destructive"
                    }
                  />
                </FormControl>
                <FormMessage className="pl-4 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-[4.4rem] space-y-1">
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...field}
                      className={
                        form.formState.errors?.password &&
                        "focus-visible:ring-destructive border-destructive"
                      }
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-2 absolute top-1/2 -translate-y-1/2 right-2 hover:bg-transparent">
                    {showPassword ? (
                      <IoEyeOffSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                    ) : (
                      <IoEyeSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                    )}
                  </Button>
                </div>
                <FormMessage className="pl-4 text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 absolute -translate-x-1/2 -translate-y-1/2 bottom-20 left-1/2">
        <Button
          variant="secondary"
          type="button"
          size="lg"
          onClick={autoFillLogin}
          className="w-full text-sm">
          Auto Fill
        </Button>
      </div>
    </>
  );
};

export default FormLogin;
