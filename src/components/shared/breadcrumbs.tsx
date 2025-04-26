"use client"

import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
    const pathName = usePathname();
    const breadSlice = pathName.split("/")
    .splice(2).map(path => path.slice(0,1).toUpperCase().concat(path.slice(1)));
    return (
        <p>{breadSlice.join('').length > 30 ? (breadSlice.join(" > ")).slice(0,28).concat("..") : (breadSlice.join(" > "))}</p>
    );
};

export default Breadcrumbs;