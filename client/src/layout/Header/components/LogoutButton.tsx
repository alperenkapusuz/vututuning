"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteToken } from "@/lib/server-action-token";
import { useRouter } from "next/navigation";

const CustomLogout = () => {
  const router = useRouter();
  const logout = async () => {
    await deleteToken();
  };

  function asyncLogout(succes: boolean) {
    return new Promise((resolve) => {
      logout();
      router.push("/");
      resolve(succes);
    });
  }

  return (
    <Button size="sm" onClick={() => asyncLogout(true)}>
      Log Out
    </Button>
  );
};

export default CustomLogout;
