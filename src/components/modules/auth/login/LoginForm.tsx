"use client";

import logo from "@/assets/logos/Meal Moja Logo Teal.png";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setUser} from "@/redux/featured/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {getCurrentUserInfo, loginUser } from "@/services/Auth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
    const form = useForm();
    const [isHidden, setIsHidden] = useState(true);
    const dispatch = useAppDispatch();

    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const router = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Loging in...", { duration: 2000 });
        try {
            const res = await loginUser(data);
            if (res?.success) {
                const userInfo = await getCurrentUserInfo();
                const user = userInfo.data;
                toast.success("Login Successful!", { id: toastId });
                dispatch(
                    setUser({
                        user: {
                            email: user.email,
                            role: user.role,
                            phoneNumber: user.phoneNumber,
                            userId: user._id,
                            image: user.profileImage,
                            name: user.name
                          },
                        token: res.data.accessToken,
                    })
                );
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
                form.reset();
            }
            else{
                toast.error(res?.message || "Failed to login..!", {
                    id: toastId,
                });
            }
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.message || "Failed to login!", {
                id: toastId,
            });
        }
    };
    return (
        <div className="max-w-md h-fit rounded-lg shadow-boxed px-5 md:px-8 py-5 mb-5 mt-20 bg-white">
            <div className="flex justify-center">
                <Image
                    height={120}
                    width={120}
                    src={logo}
                    alt="Meal Moja"
                    priority={true}
                    quality={70}
                    className="border-4 rounded-full mb-5 -mt-20"
                />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    <FormField
                        control={form.control}
                        name="loginCredentials"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email or Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email or phone number"
                                        {...field}
                                        value={field.value || ""}
                                        required
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type={isHidden ? "password" : "text"}
                                        placeholder="Enter Password"
                                        {...field}
                                        value={field.value || ""}
                                        required
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="absolute bottom-0 right-0 rounded-s-none"
                                    onClick={() => setIsHidden(!isHidden)}>
                                    {isHidden ? <EyeOff /> : <Eye />}
                                </Button>
                            </FormItem>
                        )}
                    />

                    <Button
                        className="w-full mt-5 mx-auto block"
                        type="submit">
                        Login
                    </Button>
                    <p className="text-gray-700 text-center ">
                        Don&#39;t have an account?{" "}
                        <Link
                            className="text-emerald-700 font-semibold"
                            href="/register">
                            Register Now!
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
