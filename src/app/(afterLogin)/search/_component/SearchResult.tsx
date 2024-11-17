"use client";
import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { getSearchResult } from "../_lib/getSearchResult";
import { Post as IPost } from "@/model/Post";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function SearchResult({ searchParams }: Props) {
  // 다이나믹 쿼리키 타입 잡기
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
}
