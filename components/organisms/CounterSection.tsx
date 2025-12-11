import HeaderBetween from "@/components/templates/HeaderBetween";
import ValueCounter from "@/components/atoms/ValueCounter";
import SectionWrapper from "./SectionWrapper";

interface CounterSectionProps {
  withHeading: boolean;
}

export default function CounterSection({
  withHeading = true,
}: CounterSectionProps) {
  return (
    <section className="w-full main-wrapper mx-auto">
      <SectionWrapper>
        {withHeading && (
          <HeaderBetween
            heading="Numbers That Tell Our Story"
            subheading={`Decades of serving customers with a diverse collection of rugs have built a strong foundation of trust and reliability.`}
          />
        )}
        <ValueCounter />
      </SectionWrapper>
    </section>
  );
}
