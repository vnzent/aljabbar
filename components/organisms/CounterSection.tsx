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
          heading="heading"
          subheading="subHeading"
          translationKey="counterSection"
          />
        )}
        <ValueCounter />
      </div>
    </section>
  );
}
