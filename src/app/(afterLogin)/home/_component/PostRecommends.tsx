"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts, recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000 // 기본 5분
  });

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
}
