/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


// get all orders
export const getAllOrders = async (
    page?: string,
    limit?: string
) => {
const token = (await cookies()).get("accessToken")?.value;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders?limit=${limit || 15}&page=${page || 1}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                next: {
                    tags: ["ORDERS"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};

// update order status
export const updateOrder = async ({id, status}: {id:string,status: string}) => {
const token = (await cookies()).get("accessToken")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/update-order-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
            body: JSON.stringify({id, status})
        });
        revalidateTag("ORDERS");
        const data = await res.json();
        return data;

    } catch (error: any) {
        return Error(error.message);
    }
}

// delete order
export const deleteOrder = async (id: string) => {
const token = (await cookies()).get("accessToken")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
        });
        revalidateTag("ORDERS");
        const data = await res.json();
        console.log(data);
        return data;

    } catch (error: any) {
        return Error(error.message);
    }
}