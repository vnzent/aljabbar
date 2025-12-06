import HeaderBetween from "@/components/templates/HeaderBetween";
import ValueCounter from "@/components/atoms/ValueCounter";

export default function CounterSection() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-8 md:gap-10 main-wrapper mx-auto">
        <HeaderBetween
          heading="Numbers That Tell Our Story"
          subheading={`Decades of serving customers with a diverse collection of\nrugs have built a strong foundation of trust and reliability.`}
        />
        <ValueCounter />
      </div>
    </section>
  );
}
