/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
export const getAllProducts = async (
  page?: string,
  limit?: string,
  searchTerm?: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meals?limit=${limit || 6}&page=${page || 1
      }&searchTerm=${searchTerm || ""}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get product by id
export const getProductById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meals/${id}`);

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get delete product by id
export const deleteProduct = async (id: string) => {
  const token =  (await cookies()).get("accessToken")?.value
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
    });
    revalidateTag("PRODUCT");
    const data = await res.json();
    return data;

  } catch (error: any) {
    return Error(error.message);
  }
}