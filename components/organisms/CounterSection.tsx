import HeaderBetween from "@/components/templates/HeaderBetween";
import ValueCounter from "@/components/atoms/ValueCounter";

interface CounterSectionProps {
  withHeading: boolean;
}

export default function CounterSection({ withHeading = true }: CounterSectionProps) {
  return (
    <section className="w-full main-wrapper mx-auto">
      <div className="flex flex-col gap-8 md:gap-10">
        {withHeading && (
          <HeaderBetween
            heading="Numbers That Tell Our Story"
            subheading={`Decades of serving customers with a diverse collection of\nrugs have built a strong foundation of trust and reliability.`}
          />
        )}
        <ValueCounter />
      </div>
    </section>
  );
}
