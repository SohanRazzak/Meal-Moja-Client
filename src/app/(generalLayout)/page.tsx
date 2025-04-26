import MealBoxFaq from "@/components/modules/home/faq/Faq";
import FeaturedSection from "@/components/modules/home/featured/Featured";
import Banner from "@/components/modules/home/hero/Banner";
import Testimony from "@/components/modules/home/testimonial/Testimony";

const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <FeaturedSection/>
      <MealBoxFaq />
      <Testimony/>
    </div>
  );
};

export default HomePage;
