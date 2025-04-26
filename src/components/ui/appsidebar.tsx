"use client";
import {
    FilePlus,
    ListOrdered,
    Users,
    TruckElectric,
    Kanban,
    List,
    BookDashed,
} from "lucide-react";
import logoSquare from "@/assets/logos/logo-icon.png";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import SectionHeading from "../shared/sectionheading";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { logout } from "@/services/Auth";
import { protectedRoutes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

// order / invoice
const orderItems = [
    {
        title: "Order List",
        url: "/manage-orders",
        icon: ListOrdered,
    },
];
// user links
const userManagementItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: BookDashed,
    },
    {
        title: "User List",
        url: "/manage-users",
        icon: Users,
    },
];

// product group
const productMenuItems = [
    {
        title: "Add New Menu",
        url: "/add-product",
        icon: FilePlus,
    },
    {
        title: "Meal List",
        url: "/manage-products",
        icon: List,
    },
];

// for user -------
const orderManagementItems = [
    {
        title: "Track Orders",
        url: "/track-orders",
        icon: TruckElectric,
    },
    {
        title: "Manage Orders",
        url: "/manage-orders",
        icon: Kanban,
    },
];

export function AppSidebar() {
    const user = useAppSelector(selectCurrentUser);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            dispatch(logoutUser());
            await logout();
        } finally {
            if (protectedRoutes.some((route) => pathname.match(route))) {
                router.push("/");
            }
        }
    };
    
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/">
                    <div className="items-center hidden md:flex justify-center">
                        <Image
                            src={logoSquare}
                            width={36}
                            height={36}
                            alt="Meal Moja Logo"
                            className="lucid"
                        />
                        <span className="overflow-hidden">
                            <SectionHeading
                                title="Meal Moja"
                                className="!mb-0"
                            />
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            {user?.role === "admin" ? (
                <>
                    <SidebarContent>
                        {/* Sidebar Group  */}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                User Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {userManagementItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={"/dashboard/admin".concat(
                                                        item.url
                                                    )}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* Order management admin*/}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Order Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {orderItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={"/dashboard/admin".concat(
                                                        item.url
                                                    )}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* Product Management  */}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Product Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {productMenuItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={"/dashboard/admin".concat(
                                                        item.url
                                                    )}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>{" "}
                </>
            ) : (
                <>
                    <SidebarContent>
                        {/* Order management User*/}
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                Order Management
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {orderManagementItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={`/dashboard/user${item?.url}`}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </>
            )}

            {/* sidebar footer  */}
            <SidebarFooter>
                <Button
                    className="bg-emerald-500"
                    onClick={() => handleLogout()}>
                    Logout Now
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
