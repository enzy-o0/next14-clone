"use client";

import { usePathname, useRouter } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.scss";
import { useSession } from "next-auth/react";

export default function TrendSection() {
  const pathname = usePathname();
  const { data } = useSession();
  const router = useRouter();

  if (pathname === "/explore") return null;

  if (data?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.notrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
