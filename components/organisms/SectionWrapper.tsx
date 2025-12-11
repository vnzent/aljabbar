import React from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`space-y-6 md:space-y-10 ${className}`}>{children}</div>
  );
};

export default SectionWrapper;
