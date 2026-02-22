"use client";
import ProductCard from "@/components/modules/product/productCard";
import BarcodeLabelPrintingCard from "@/components/modules/product/productCard";
import FeaturedProductCard from "@/components/modules/product/proxy";
import ModernChainCarousel from "@/components/modules/product/slider";
// import SliderCall from "@/components/modules/product/sliderCall";
import { chainData } from "@/data/sliderData";



const ProductsPage = () => {
   return (
      <div>
         <ModernChainCarousel items={chainData} visibleItemCount={3} scrollSpeedMs={2000} onChainSelect={(id, name) => console.log("Selected:", id, name)} />
            {/* <ProductCard title="Barcode Label Printing" description="Print high-quality barcode labels for inventory management." price={29.99} features={["High-resolution printing", "Custom label sizes", "Easy-to-use interface"]} /> */}
            <FeaturedProductCard/>
      </div>
   );
};

export default ProductsPage;