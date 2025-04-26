"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import websiteLogo from "../../assets/logos/Meal Moja Logo Teal Transparen.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { ImSpoonKnife } from "react-icons/im";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser, selectCurrentUser } from "@/redux/featured/auth/authSlice";
import { logout } from "@/services/Auth";
import { protectedRoutes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For the user image dropdown
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-8 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold text-black text-pretty font-ubuntu flex gap-2 justify-center items-center">
                    <Image
                        src={websiteLogo}
                        alt="Register Now"
                        height={40}
                        width={40}
                        className="aspect-square"
                    />
                    <p>
                        <span className="text-emerald-500 mr-1">Meal</span>Moja
                    </p>
                </Link>

                {/* Hamburger */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        {isOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
                    </svg>
                </button>

                {/* Links + User Image Dropdown (Desktop) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-center items-center">
                        <IoMdHome /> Home
                    </Link>
                    <Link
                        href="/meals"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-center items-center">
                        <IoSearch />
                        Find Meals
                    </Link>
                    <Link
                        href="/order-meal"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-center items-center">
                        <ImSpoonKnife />
                        Order Meal
                    </Link>

                    {/* User Dropdown */}
                    {user?.email ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2">
                                <Image
                                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                    alt="User Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                                    <Link
                                        href={
                                            user?.role === "admin"
                                                ? "/dashboard/admin/profile"
                                                : "/dashboard/user/profile"
                                        }
                                        className="block font-medium px-4 py-2 text-gray-800 hover:bg-emerald-100">
                                        Profile
                                    </Link>
                                    <Link
                                        href={
                                            user?.role === "admin"
                                                ? "/dashboard/admin"
                                                : "/dashboard/user"
                                        }
                                        className="block font-medium px-4 py-2 text-gray-800 hover:bg-emerald-100">
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full font-medium px-4 py-2 text-gray-800 hover:bg-emerald-100 text-left">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-700 font-medium">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 absolute z-10 bg-white w-full">
                    <Link
                        href="/"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-start items-center">
                        <IoMdHome /> Home
                    </Link>
                    <Link
                        href="/meals"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-start items-center">
                        <IoSearch />
                        Find Meals
                    </Link>
                    <Link
                        href="/order-meal"
                        className="hover:text-emerald-500 font-medium flex gap-1 justify-start items-center">
                        <ImSpoonKnife />
                        Order Meal
                    </Link>

                    {!user?.email ? (
                        <Link
                            href="/login"
                            className="block bg-emerald-500 text-white text-center py-2 font-medium rounded hover:bg-emerald-700">
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={
                                    user?.role === "admin"
                                        ? "/dashboard/admin"
                                        : "/dashboard/user"
                                }
                                className="hover:text-emerald-500 font-medium flex gap-1 justify-start items-center text-gray-800">
                                <LayoutDashboard className="w-4" />
                                Dashboard
                            </Link>
                            <Button
                                onClick={() => handleLogout()}
                                className="block bg-emerald-500 text-white text-center py-2 font-medium rounded hover:bg-emerald-700">
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
