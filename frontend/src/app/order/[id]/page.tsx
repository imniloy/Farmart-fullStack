import React from "react";

const Page = ({ params }): React.ReactNode => {
  return <div>page {params.id}</div>;
};

export default Page;
