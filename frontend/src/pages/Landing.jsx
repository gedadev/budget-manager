import { Benefits, CTA, Features, Hero } from "../components/landing/Landing";
import { Header } from "../components/landing/Header";

export function Landing() {
  return (
    <div>
      <header className="absolute top-0 flex justify-between items-center w-full p-3 z-50">
        <Header />
      </header>
      <main>
        <Hero />
        <Features />
        <Benefits />
        <CTA />
      </main>
    </div>
  );
}
