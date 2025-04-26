"use client";

import SectionHeading from "@/components/shared/sectionheading";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { productSchema } from "./ProductValidation";
import { useAddProductsMutation } from "@/redux/featured/produtcs/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { dietaryOptions } from "./constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddProductForm = () => {
    const form = useForm({
        resolver: zodResolver(productSchema),
    });
    const [addProducts] = useAddProductsMutation();
    const user = useAppSelector(selectCurrentUser);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Submitting menu...", { duration: 2000 });
        const { ingredients, ...menu } = data;
        const ingredientsArray = ingredients.split(", ");
        const menuData = {
            ...menu,
            ingredients: ingredientsArray,
            createdBy: user!.userId,
        };
        // Resetting form
        const emptyValues = Object.fromEntries(
            Object.keys(data).map((key) => [key, ""])
        );
        try {
            await addProducts(menuData).unwrap();
            toast.success("Menu added successfully", { id: toastId });

            // setting a reset
            form.reset(emptyValues);

            form.reset({});
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.data?.message || "Failled to ad new menu!", {
                id: toastId,
            });
        }
    };

    return (
        <div className="w-full mx-auto rounded-lg shadow-boxed px-5 md:px-8 py-6 my-8 bg-white">
            <SectionHeading title="Add a New Meal" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Menu</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Menu title"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe the meal..."
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Price"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        value={field?.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dietary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dietary Tag</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a dietary tag" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {dietaryOptions.map((option) => (
                                                <SelectItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ingredients"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Ingredients (comma separated)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Chicken, Lettuce, Tomato"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="available"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-3">
                                    <FormControl>
                                        <Input
                                            type="checkbox"
                                            className="w-4"
                                            checked={field?.value || false}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                        />
                                    </FormControl>
                                    <FormLabel>
                                        Make this meal available
                                    </FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">
                        Add To Menu
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddProductForm;
