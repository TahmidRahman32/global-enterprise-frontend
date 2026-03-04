
import CardSection from "@/components/modules/product/CardSection";
import ProductCard from "@/components/modules/product/productCard";
import BarcodeLabelPrintingCard from "@/components/modules/product/productCard";
import FeaturedProductCard from "@/components/modules/product/proxy";
import { CarouselDemo } from "@/components/modules/product/slider";
// import ProductShowcaseSlider from "@/components/modules/product/slider";
// import ProductShowcaseSlider, {  products, } from "@/components/modules/product/slider";
// import  { ProductSlider } from "@/components/modules/product/slider";
// import ModernChainCarousel from "@/components/modules/product/slider";
// import SliderCall from "@/components/modules/product/sliderCall";
// import { chainData } from "@/data/sliderData";



const ProductsPage = () => {
   return (
      <div className="">
         <CarouselDemo/>
      
         <CardSection/>
         <FeaturedProductCard />
      </div>
   );
};

export default ProductsPage;