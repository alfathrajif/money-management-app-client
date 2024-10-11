"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoEyeOffSharp, IoEyeSharp, IoReload } from "react-icons/io5";
import authServices from "@/services/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { faker } from "@faker-js/faker";
import { IAuthRegister } from "@/types";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const FormSignUp = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<IAuthRegister | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await authServices.register(payload);

      if (res.success) {
        toast({
          description: res.message,
          variant: "default",
        });

        setTimeout(() => {
          setIsLoading(false);
          router.push("/login");
        }, 1000);
      } else {
        setErrors(res.errors);
        toast({
          title: res.message,
          description: res.errors.email,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const autoFillRegister = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = firstName + lastName;
    const email = faker.internet
      .email({
        firstName: firstName,
      })
      .toLowerCase();
    const password = "Password123";
    form.setValue("name", name);
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-[4.4rem] space-y-1">
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    autoComplete="name"
                    className={
                      form.formState.errors?.name &&
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
                {errors?.email && (
                  <p className="text-xs pl-4 font-medium text-destructive">
                    {errors.email}
                  </p>
                )}
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
              "Register"
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-4 absolute -translate-x-1/2 -translate-y-1/2 bottom-10 left-1/2">
        <Button
          variant="secondary"
          type="button"
          size="lg"
          onClick={autoFillRegister}
          className="w-full text-sm">
          Auto Fill
        </Button>
      </div>
    </>
  );
};

export default FormSignUp;
