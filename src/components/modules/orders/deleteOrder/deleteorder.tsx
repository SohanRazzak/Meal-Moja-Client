"use client";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import Swal from 'sweetalert2';
import { deleteOrder } from "@/services/Orders";

type TDeleteButtonProps = {
    id: string;
    title: string;
    variant?: "default" | "ghost" | "link" | "destructive" | "outline";
    className?: string;
};

const DeleteOrderButton = ({
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
                await deleteOrder(id);
                toast.success("Order deleted successfully");
            }
        } catch (error) {
            toast.error("Failed to delete order");
            console.error("Error deleting order:", error);
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

export default DeleteOrderButton;
