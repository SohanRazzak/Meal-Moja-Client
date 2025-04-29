/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


// setting accessToken Manually
export const setUserCookie = async (accessToken: string) => {
    (await cookies()).set("accessToken", accessToken);
};

// logging in user using server action
export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        const result = await res.json();

        
        if (result?.success) {
            
            (await cookies()).set("accessToken", result?.data?.accessToken);
            // refresh token server theke asbe response er sathe
            // (await cookies()).set("refreshToken", result?.data?.refreshToken);

            // recieving , formatting and  Setting cookies
            (await cookies()).set("refreshToken", res.headers.getSetCookie()[0].slice(13).split(";")[0])
            
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

// logout user
export const logout = async () => {
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
};

// get current user
export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    } else {
        return null;
    }
};

// get current user profile 
export const getCurrentUserInfo = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/users/get-my-data`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `${accessToken}`
                }
            })
            const result = res.data;

            return result;
        } catch (error: any) {
            return Error(error);
        }
};

