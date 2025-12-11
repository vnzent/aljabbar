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
          heading="heading"
          subheading="subHeading"
          translationKey="counterSection"
          />
        )}
        <ValueCounter />
      </SectionWrapper>
    </section>
  );
}
