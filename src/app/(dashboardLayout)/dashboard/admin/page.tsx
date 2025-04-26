import { getAllOrders } from "@/services/Orders";
import { getAllProducts } from "@/services/Products";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart,  DollarSign } from "lucide-react";
import { TMeal, TOrder } from "@/types";
import SectionHeading from "@/components/shared/sectionheading";
import Link from "next/link";

const AdminDashboardPage = async () => {
    const resOrders = await getAllOrders(undefined, "20");
    const orders = resOrders?.data || [];
    const resProduct = await getAllProducts(undefined, "5");
    const products = resProduct?.data?.result || [];
    const productCount = resProduct?.data?.meta.total;

    // Calculate stats
    const totalRevenue = orders.reduce(
        (sum: number, order: TOrder) => sum + order.totalPrice,
        0
    );
    const pendingOrders = orders.filter(
        (order: TOrder) => order.status === "Pending"
    ).length;
    const lowStockProducts = products.filter(
        (product: TMeal) => !product.available
    ).length;

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {orders.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {pendingOrders} pending orders
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {productCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {lowStockProducts} low in stock
                        </p>
                    </CardContent>
                </Card>

                
            </div>

            <div className="grid gap-4 md:grid-cols-2 overflow-x-auto">
                <Card>
                    <CardHeader>
                        <CardTitle><SectionHeading title="Recent Orders" className="*:text-xl *:text-left !mb-0"/></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.slice(0, 5).map((order : TOrder) => (
                                    <TableRow key={order._id}>
                                        <TableCell>
                                            {order.customer.name.slice(0,14).concat("..") || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {order.email || "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    order.status === "Delivered"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${order.totalPrice.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle><SectionHeading title="Recent Products" className="*:text-xl *:text-left !mb-0"/></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">
                                        Price
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.slice(0, 5).map((product: TMeal) => (
                                    <TableRow key={product._id}>
                                        <TableCell className="font-medium to-gray-800">{product.title}</TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    !product.available
                                                        ? "text-red-500 font-medium bg-rose-200 rounded-xl py-1 px-2"
                                                        : "text-green-600 bg-green-200 rounded-xl py-1 px-2"
                                                }>
                                                {product.available ? "Available" : "Unavailable"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${product.price.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                <Button asChild>
                    <Link href="/dashboard/admin/manage-orders">View All Orders</Link>
                </Button>
                <Button variant="outline" className="ml-4" asChild>
                    <Link href="/dashboard/admin/manage-products">Manage Products</Link>
                </Button>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
