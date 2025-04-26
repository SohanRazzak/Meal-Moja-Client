// src/components/meal-testimonials.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import testimonials from "./testimonies";
import SectionHeading from "@/components/shared/sectionheading";
import { Card } from "@/components/ui/card";

const Testimony = () => {
    return (
        <div className="grid grid-cols-1 gap-5 px-4 max-w-6xl mx-auto mt-5 mb-14 sm:grid-cols-2">
            <div className="col-span-full">
                <SectionHeading
                    title="Customer Testimonies"
                    subtitle="See what out valued regular customers say"
                />
            </div>
            {testimonials.map((testimonial) => (
                <Card
                    key={testimonial.id}
                    className="p-6 border rounded-lg hover:shadow-md transition-shadow ">
                    <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>
                                {testimonial.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-medium">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {testimonial.role}
                            </p>
                        </div>
                    </div>

                    <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < testimonial.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-muted text-muted"
                                }`}
                            />
                        ))}
                    </div>

                    <p className="text-muted-foreground mb-3">
                        {testimonial.content}
                    </p>

                    {testimonial.favoriteMeal && (
                        <p className="text-sm text-primary font-medium">
                            Favorite Meal:{" "}
                            <span className="font-normal">
                                {testimonial.favoriteMeal}
                            </span>
                        </p>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default Testimony;
