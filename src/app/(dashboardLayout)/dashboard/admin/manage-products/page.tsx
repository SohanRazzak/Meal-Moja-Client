import { getAllProducts } from "@/services/Products";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TMeal } from "@/types";
import SectionHeading from "@/components/shared/sectionheading";
import DeleteByIdButton from "@/components/modules/products/deleteProduct/deleteproduct";
import Pagination from "@/components/shared/pagination";

const ManageProductsPage = async () => {
    const data = await getAllProducts(undefined, "20", undefined);
    const products = data?.data?.result || [];

    return (
        <div className="container mx-auto py-10 px-4">
            <SectionHeading size="4xl" title="Manage All Meals" />
            <div className="flex justify-end items-center mb-6">
                <Button className="bg-emerald-500" asChild>
                    <Link href="/dashboard/admin/add-product">
                        Add New Menu
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product: TMeal) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            width={50}
                                            height={50}
                                            className="h-10 w-10 object-cover rounded"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {product.title}
                                </TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.dietary}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            product.available === true
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}>
                                        {product.available
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
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
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/dashboard/admin/update-product/${product._id}`}
                                                    className="flex items-center">
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 py-0 flex items-center">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <DeleteByIdButton
                                                    id={product._id}
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
                <div className="grid place-items-center mb-5 px-3">
                <Pagination
                    totalPage={data?.data?.meta?.totalPage}
                    page={data?.data?.meta?.page}
                />
                </div>
            </div>
        </div>
    );
};

export default ManageProductsPage;
