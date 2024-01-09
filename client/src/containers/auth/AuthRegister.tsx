"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn, registerUserFn } from "@/api/authQueryFns";
import cookie from "js-cookie";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Bu alanın doldurulması zorunludur." }),
    email: z
      .string()
      .min(1, { message: "Bu alanın doldurulması zorunludur." })
      .email("Bu geçerli bir e-posta değil."),
    password: z.string().min(4, { message: "Minimum 4 karakter içermelidir" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Minimum 4 karakter içermelidir" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Şifrelet eşleşmiyor.",
      });
    }
  });

const AuthRegister = () => {
  const closeRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationFn: loginUserFn,
    onSuccess: (data) => {
      if (!data.data.data?.token) return;
      cookie.set("token", data.data.data.token, {
        expires: 1,
        sameSite: "none",
        secure: true,
      });
      // handleOpen(false);
      if(!closeRef.current) return;
      //@ts-ignore
      closeRef.current.click();
      form.reset();
    },
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: registerUserFn,
    onSuccess: () => {
        const email = form.watch("email");
        const password = form.watch("password");
        loginUser({ email, password });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const reqBody = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "user",
    };
    registerUser(reqBody);
  }

  return (
    <Dialog>
      <DialogClose ref={closeRef} className="overflow-hidden" />
      <DialogTrigger asChild>
        <Button variant={"outline"} className="border border-primary">
          Kayıt Ol
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Üye Ol</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Kullanıcı adı giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Parola giriniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parola Tekrar</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Parola giriniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Üye Ol
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRegister;
