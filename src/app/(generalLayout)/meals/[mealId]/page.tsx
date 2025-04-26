import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getProductById } from "@/services/Products";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MealDetailsPage = async ({
    params,
}: {
    params: Promise<{ mealId: string }>;
}) => {
    const { mealId } = await params;
    const res = await getProductById(mealId);
    const meal = res.data;

    const formattedDate = new Date(meal?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen max-w-4xl mx-auto py-8 px-4">
            <Card className="overflow-hidden py-0">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <div className="relative h-64 md:h-full">
                            <Image
                                src={meal.image}
                                alt={meal.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-6">
                        <CardHeader className="p-0 mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl font-bold">
                                        {meal.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Added on {formattedDate}
                                    </CardDescription>
                                </div>
                                <Badge
                                    variant={
                                        meal.available
                                            ? "default"
                                            : "destructive"
                                    }>
                                    {meal.available
                                        ? "Available"
                                        : "Unavailable"}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">
                                    Description
                                </h3>
                                <p className="text-sm">{meal.description}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Dietary</h3>
                                <Badge className="bg-emerald-700">
                                    {meal.dietary}
                                </Badge>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">
                                    Ingredients
                                </h3>
                                <ul className="grid grid-cols-2 gap-2 text-sm">
                                    {meal.ingredients.map(
                                        (ingredient: string, index: number) => (
                                            <li
                                                key={index}
                                                className="flex items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                                                {ingredient}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <div>
                                    <span className="text-2xl font-bold">
                                        ${meal.price.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-muted-foreground ml-1">
                                        / serving
                                    </span>
                                </div>
                                <Button size="lg">Add to Cart</Button>
                            </div>
                        </CardContent>

                        <CardFooter className="p-0 pt-6 text-xs text-muted-foreground">
                            Meal ID: {meal.createdBy}
                        </CardFooter>
                    </div>
                </div>
            </Card>
            <Link href="/meals">
            <Button className="flex items-center my-8">
                <ArrowLeftCircle/>
            Return to all meals
            </Button>
            </Link>
        </div>
    );
};

export default MealDetailsPage;
