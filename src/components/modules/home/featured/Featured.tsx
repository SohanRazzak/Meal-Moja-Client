import ProductCard from "@/components/modules/products/productCard/ProductCard";
import SectionHeading from "@/components/shared/sectionheading";
import { getAllProducts } from "@/services/Products";
import { TMeal } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FeaturedSection = async () => {
    // Get all meals
    const res = await getAllProducts("1", "6");

    const products: TMeal[] = res?.data?.result;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 mb-5 gap-5 md:max-w-3xl lg:max-w-6xl mx-auto place-items-center px-4">
            <div className="col-span-full w-full">
                <SectionHeading
                    title="Featured Meals"
                    subtitle="Find what are valued customers like most"></SectionHeading>
            </div>
            {products?.map((product: TMeal) => (
                <ProductCard key={product._id} product={product} />
            ))}
            <div className="col-span-full my-4">
                <Link href="/meals">
                    <Button className="bg-emerald-500">Find All Meals</Button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedSection;
