"use client";

import FollowRecommend from "./FollowRecommend";
import { User } from "@/model/User";
import { useQuery } from "@tanstack/react-query";
import { getFollowRecommends } from "../home/_lib/getFollowRecommends";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
}
