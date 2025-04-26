import AddProductForm from "@/components/modules/products/addProduct/AddProductForm";
import Image from "next/image";
import chef from '@/assets/Chef-bro.svg';

const AddProductPage = () => {
    return (
            <div className='max-w-6xl mx-auto min-h-screen flex flex-row-reverse items-center justify-around gap-5 p-3'>
                <div className="hidden lg:block self-center md:basis-1/2 justify-items-center">
                    <Image
                    src={chef}
                    alt="Add new Meal"
                    height={400}
                    width={400}
                    className="aspect-square"
                    />
                </div>
                <div className="md:basis-1/2 shrink-0 w-full my-8">
                <AddProductForm/>
                </div>
            </div>
        );
};

export default AddProductPage;