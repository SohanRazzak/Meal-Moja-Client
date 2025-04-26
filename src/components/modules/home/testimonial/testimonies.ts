// src/data/meal-testimonials.ts
export type TTestimonial = {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
    favoriteMeal?: string;
  }
  
  const testimonials: TTestimonial[] = [
    {
      id: 1,
      name: "Sarah Miller",
      role: "Busy Working Mom",
      content: "Meal Moja has saved me so much time! The turkey pepperoni sandwiches are my kids' favorite lunch now.",
      rating: 5,
      avatar: "https://img.freepik.com/free-vector/happy-smiling-woman-portrait_52683-64642.jpg",
      favoriteMeal: "Turkey Pepperoni Sandwich"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Fitness Coach",
      content: "Perfect macros for my meal plan. The grilled salmon with avocado salsa is my post-workout go-to.",
      rating: 4,
      avatar: "https://img.freepik.com/free-vector/gradient-male-avatar_23-2149332373.jpg",
      favoriteMeal: "Grilled Salmon with Avocado Salsa"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "College Student",
      content: "Affordable, delicious, and saves me from dining hall food. The tofu stir-fry bowls are amazing!",
      rating: 5,
      avatar: "https://img.freepik.com/free-vector/young-woman-avatar_24877-50942.jpg",
      favoriteMeal: "Tofu Stir-Fry Bowl"
    },
    {
      id: 4,
      name: "Marcus Wright",
      role: "Keto Dieter",
      content: "Finally found a meal service that understands low-carb needs. The zucchini noodles are life-changing!",
      rating: 5,
      avatar: "https://img.freepik.com/free-vector/portrait-african-american-man_52683-53654.jpg",
      favoriteMeal: "Zucchini Noodles with Pesto"
    }
  ];
  
  export default testimonials;