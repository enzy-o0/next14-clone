"use client";

import { ReactNode, createContext, useState } from "react";

// 초깃값
export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

type TabProviderProps = {
  children: ReactNode;
};

export default function TabProvider({ children }: TabProviderProps) {
  const [tab, setTab] = useState("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
