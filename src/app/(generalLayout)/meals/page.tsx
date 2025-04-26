import SearchBar from "@/components/modules/find-meals/searchbar/Searchbar";
import ProductCard from "@/components/modules/products/productCard/ProductCard";
import Pagination from "@/components/shared/pagination";
import SectionHeading from "@/components/shared/sectionheading";
import { getAllProducts } from "@/services/Products";
import Image from "next/image";
import websiteLogo from "@/assets/logos/Meal Moja Logo Teal Transparen.png";
import { TMeal } from "@/types";

const MealsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; searchTerm: string }>;
}) => {
  const { page, limit, searchTerm } = await searchParams;

  // Get all meals
  const res = await getAllProducts(page, limit, searchTerm);

  const products: TMeal[] = res?.data?.result;

  return (
    <div className="min-h-screen grid md:grid-cols-2 lg:grid-cols-3 my-10 gap-5 md:max-w-3xl lg:max-w-6xl mx-auto place-items-center px-4">
      <div className="col-span-full w-full">
        <SectionHeading
          title="Find Your Flavor"
          subtitle="Discover meals that match your cravings.
        Fresh picks, every time you search."
        ></SectionHeading>
        <div className="w-full flex justify-between items-center px-4">
          <div className="flex justify-start items-center gap-1">
            <Image
              src={websiteLogo}
              alt="Register Now"
              height={35}
              width={35}
              className="aspect-square"
            />
            <p className="font-semibold text-lg lg:text-xl xl:text-2xl">
              Find Meals
            </p>
          </div>
          <div>
            <SearchBar></SearchBar>
          </div>
        </div>
      </div>
      {products?.map((product: TMeal) => (
        <ProductCard key={product._id} product={product} />
      ))}
      <div className="col-span-full">
        <Pagination
          totalPage={res?.data?.meta?.totalPage}
          page={res?.data?.meta?.page}
        />
      </div>
    </div>
  );
};

export default MealsPage;
