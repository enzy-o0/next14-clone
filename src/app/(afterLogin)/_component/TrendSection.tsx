"use client";

import { usePathname, useRouter } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.scss";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/_lib/getTrends";
import { HashTag } from "@/model/HashTag";

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
    // 로그인 했을 때만 호출
    enabled: !!session?.user,
  });

  const pathname = usePathname();

  if (pathname === "/explore") return null;

  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
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
