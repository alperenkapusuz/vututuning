import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./components/LogoutButton";

const Header = () => {
  const cookieStore = cookies();

  const { value: token } = cookieStore.get("token") ?? { value: null };

  return (
    <header className="sticky w-full top-0 border-b-4 bg-inherit z-20">
      <div className="mx-auto max-w-screen-xl px-4 py-2 sm:px-6 sm:py-2 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <Link href="/">
              <h1 className="text-xl font-bold text-primary sm:text-2xl">
                VUTUTUNING
              </h1>
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center">
            {token ? (
              <>
                <Link href="/create-car">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border border-primary"
                  >
                    Create Car
                  </Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border border-primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            <div className="ml-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
