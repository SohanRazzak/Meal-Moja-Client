"use client";
import { deleteProduct } from "@/services/Products";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import Swal from 'sweetalert2';

type TDeleteButtonProps = {
    id: string;
    title: string;
    variant?: "default" | "ghost" | "link" | "destructive" | "outline";
    className?: string;
};

const DeleteByIdButton = ({
    id,
    variant,
    title,
    className,
}: TDeleteButtonProps) => {


    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await deleteProduct(id);
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            toast.error("Failed to delete product");
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Button
            className={className}
            variant={variant || "ghost"}
            onClick={() => handleDelete()}>
            {title}
        </Button>
    );
};

export default DeleteByIdButton;
