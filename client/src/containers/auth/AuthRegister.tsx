"use client";
import React, { useRef } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    onSuccess: async (data) => {
      if (!data.data.data?.token) return;
      await createToken(data.data.data.token)
      form.reset();
      router.push('/')
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
    <Card className="border border-primary bg-inherit">
      <CardHeader>
        <CardTitle>Üye Ol</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default AuthRegister;
