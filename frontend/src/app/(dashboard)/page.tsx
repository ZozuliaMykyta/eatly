import Customer from "@/components/Customer";
import Discount from "@/components/Discount";
import Dishes from "@/components/Dishes";
import About from "@/components/Home/About";
import App from "@/components/Home/App";
import Hero from "@/components/Home/Hero";
import Restaurants from "@/components/Restaurants";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <App />
      <Restaurants />
      <Dishes />
      <Customer />
      <Discount />
    </>
  );
}
