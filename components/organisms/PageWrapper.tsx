import React from "react";

const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={`space-y-16 md:space-y-24 lg:space-y-30 ${className}`}>
      {children}
    </main>
  );
};

export default PageWrapper;
