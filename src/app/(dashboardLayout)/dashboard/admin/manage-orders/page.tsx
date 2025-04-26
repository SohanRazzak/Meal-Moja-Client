/* eslint-disable @typescript-eslint/no-explicit-any */

// import Pagination from "@/components/shared/pagination";
import DeleteOrderButton from "@/components/modules/orders/deleteOrder/deleteorder";
import ChangeOrderStatus from "@/components/modules/orders/orderStatus/changeorderstatus";
import SectionHeading from "@/components/shared/sectionheading";
import { Button } from "@/components/ui/button";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllOrders } from "@/services/Orders";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { toast } from "sonner";
// import Swal from "sweetalert2";

const ManageOrdersPage = async () => {
    const res = await getAllOrders(undefined, "20");

    const orders = res?.data;


    // fomat date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
            <SectionHeading title="Order Management"/>
            </div>

            <div className="rounded-md border mx-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Meal Info.</TableHead>
                            <TableHead>Qty.</TableHead>
                            <TableHead>Total Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>TrxId</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order: any) => (
                            <TableRow key={order._id}>
                                <TableCell className="font-medium">
                                    {"..." + order._id.slice(-6)}
                                </TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Image
                                        src={order.customer.profileImage}
                                        alt={
                                            order.customer.title ||
                                            "profile image"
                                        }
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <p className="flex flex-col text-gray-700">
                                        <span className="font-semibold font-ubuntu">
                                            {order.customer?.name || "N/A"}
                                        </span>
                                        <span>
                                            {order.email ||
                                                order.customer?.email ||
                                                "N/A"}
                                        </span>
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <p className="flex flex-col text-gray-700">
                                        <span className="font-semibold text-indigo-700">
                                            <Link href={`/meals/${order.id._id}`}>
                                            {order.id?.title || "N/A"}
                                            </Link>
                                        </span>
                                        <span>
                                            {order.id?.dietary || "N/A"}
                                        </span>
                                    </p>
                                </TableCell>
                                <TableCell>{order.quantity} x</TableCell>
                                <TableCell>
                                    ${order.totalPrice.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <ChangeOrderStatus id={order._id} value={order.status}/>
                                </TableCell>
                                <TableCell>
                                    {order.transaction?.id ? (
                                        <p className="flex flex-col gap-1 text-gray-700 font-medium">
                                            <span className="capitalize">
                                                {order.transaction.id}
                                            </span>
                                            <span>
                                                {
                                                    order.transaction
                                                        .transactionStatus
                                                }
                                            </span>
                                        </p>
                                    ) : (
                                        "Not paid"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {formatDate(order.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0">
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuItem className="text-red-600 py-0 flex items-center">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <DeleteOrderButton
                                                    id={order._id}
                                                    title="Delete"
                                                    className="px-0 py-0 h-8 self-center"
                                                />
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* <div className="grid place-items-center mb-5 px-3">
                    <Pagination
                        totalPage={res?.data?.meta?.totalPage}
                        page={res?.data?.meta?.page}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default ManageOrdersPage;
