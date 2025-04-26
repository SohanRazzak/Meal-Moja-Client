import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/sectionheading";
import { faqItems } from "./faqItems";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}


const MealBoxFaq = () => {
    const items = faqItems
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
                    <SectionHeading
                        title="Frequently Asked Questions"
                        subtitle="Answers to your common Meal Moja user questions"
                    />
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="mx-auto w-full lg:max-w-3xl mb-10"
                >
                    {items.map((item: FaqItem) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                                    {item.question}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="sm:mb-1 lg:mb-2">
                                <div className="text-muted-foreground lg:text-lg">
                                    {item.answer}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
                    <div className="relative">
                        <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                        <Avatar className="mb-4 size-16 border md:mb-5">
                            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
                            <AvatarFallback>SU</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
                        Need more help?
                    </h3>
                    <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
                        Our support team is always ready to assist you with your
                        Meal Moja user experience.
                    </p>
                    <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                        <Button className="w-full sm:w-auto" asChild>
                            <a
                                href="mailto:support@mealbox.com"
                                target="_blank"
                            >
                                Contact Support
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MealBoxFaq;
