"use server";

import { cookies } from "next/headers";

export async function createToken(data: string) {
  cookies().set("token", data, { secure: true });
}

export async function deleteToken() {
  cookies().delete("token");
}
