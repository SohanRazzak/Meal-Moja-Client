import UpdateProductForm from "@/components/modules/products/updateProduct/UpdateProductForm";
import Image from "next/image";
import user from '@/assets/edit-meal.svg';


const UpdateProductPage = () => {
    return (
        <div className='max-w-6xl mx-auto min-h-screen flex flex-row-reverse items-center justify-around gap-5 p-3'>
            <div className="hidden lg:block self-center md:basis-1/2 justify-items-center">
                <Image
                src={user}
                alt="Add new Meal"
                height={400}
                width={400}
                className="aspect-square"
                />
            </div>
            <div className="md:basis-1/2 shrink-0 w-full my-8">
            <UpdateProductForm/>
            </div>
        </div>
    );
};

export default UpdateProductPage;