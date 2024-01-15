"use client";
import React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createCarFn } from "@/api/carQueryFns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getToken } from "@/lib/server-action-token";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Button } from "@/components/ui/button";

interface JwtPayloadWithUserId extends JwtPayload {
  userId: string;
}

export const formSchema = z.object({
  name: z.string().min(1, { message: "Bu alanın doldurulması zorunludur." }),
  visualRating: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." }),
  acceleration: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." }),
  topSpeed: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." }),
  handling: z
    .string()
    .min(1, { message: "Bu alanın doldurulması zorunludur." }),
  plate: z.string().min(1, { message: "Bu alanın doldurulması zorunludur." }),
});

const CarCreate = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      visualRating: "",
      acceleration: "",
      topSpeed: "",
      handling: "",
      plate: "",
    },
  });

  const { mutate: createCar } = useMutation({
    mutationFn: createCarFn,
    onSuccess: async (data) => {
      console.log("data");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
  };

  return (
    <Card className="border border-primary bg-inherit">
      <CardHeader>
        <CardTitle>Araç Oluştur</CardTitle>
        <CardDescription>
          Oluşturacağınız Aracın Modifiyeli olmasına özen gösteriniz
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Araç Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Araç Adı Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visualRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Görsel Puan</FormLabel>
                  <FormControl>
                    <Input placeholder="Görsel Puan Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceleration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hızlanma</FormLabel>
                  <FormControl>
                    <Input placeholder="Hızlanma Değeri Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topSpeed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>En Yüksek Hız</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="En Yüksek Hız Değeri Giriniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="handling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bakım</FormLabel>
                  <FormControl>
                    <Input placeholder="Bakım Değeri Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plaka</FormLabel>
                  <FormControl>
                    <Input placeholder="Plakayı Giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Ekle
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default CarCreate;
