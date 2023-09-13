import React from "react";
import { cookies } from "next/headers";
import Header from "./Header";

const HeaderWrapper = () => {
  const cookieStore = cookies();
  console.log(cookieStore);
  return (
    <div>
      <Header />
    </div>
  );
};

export default HeaderWrapper;
