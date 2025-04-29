"use client"
import LottieRender from "@/components/shared/lottierender";
import errorAnimation from "@/assets/animations/ServerError.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <LottieRender  animationData={errorAnimation} className="max-w-lg mx-auto" />
            <Link href="/" >
                <Button className="mx-auto mb-8">Back to Homepage</Button>
            </Link>
        </div>
    );
};

export default ErrorPage;
