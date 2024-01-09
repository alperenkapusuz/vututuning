"use client";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { loginUserFn } from "@/api/authQueryFns";
import cookie from "js-cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." })
    .email("Bu geçerli bir e-posta değil."),
  password: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." }),
});

const AuthLogin = () => {
  const closeRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values);
  }

  return (
    <Dialog>
      <DialogClose ref={closeRef} className="overflow-hidden"/>
      <DialogTrigger asChild>
        <Button>Giriş Yap</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Giriş Yap</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AuthLogin;
