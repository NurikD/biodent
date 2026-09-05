import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Advantages } from "@/components/Advantages";
import { Services } from "@/components/Services";
import { Doctors } from "@/components/Doctors";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Booking } from "@/components/Booking";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";

export default function Page() {
  return (
    <>
      <JsonLd />
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Services />
        <Doctors />
        <Process />
        <Reviews />
        <Faq />
        <Booking />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
