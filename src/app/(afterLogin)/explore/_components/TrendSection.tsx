"use client";

import style from "../../_component/trendSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/_lib/getTrends";
import { HashTag } from "@/model/HashTag";
import Trend from "../../_component/Trend";

export default function TrendSection() {
  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        {data?.map((trend) => (
          <Trend key={trend.tagId} trend={trend} />
        ))}
      </div>
    </div>
  );
}
