import React from "react";

const ProductWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-10 sm:pt-15 lg:pt-20 pb-5 sm:pb-10 lg:pb-20">
      <div className="main-wrapper mx-auto py-8">
        <div className="flex gap-8">{children}</div>
      </div>
    </div>
  );
};

export default ProductWrapper;
