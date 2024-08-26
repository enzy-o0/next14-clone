import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <div>홈 레이아웃 {children}</div>;
};

export default HomeLayout;
