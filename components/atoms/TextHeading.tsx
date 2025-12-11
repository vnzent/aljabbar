import React from "react";

const TextHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-medium text-black">
      {children}
    </h2>
  );
};

export default TextHeading;
