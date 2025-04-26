"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrder } from "@/services/Orders";
import { toast } from "sonner";

const ChangeOrderStatus = ({id, value}: {id: string, value:string}) => {
        const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const data = {
            id: orderId,
            status: newStatus,
        };
        try {
            await updateOrder(data);
            toast.success("Order status updated successfully");
        } catch (error) {
            toast.error("Failed to update order status");
            console.error("Error updating order:", error);
        }
    };
    return (
        <Select
            value={value}
            onValueChange={(value) => handleStatusUpdate(id, value)}>
            <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {[
                    "Pending",
                    "Paid",
                    "Preparing",
                    "Packing",
                    "Shipped",
                    "Completed",
                    "Cancelled",
                ].map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ChangeOrderStatus;
