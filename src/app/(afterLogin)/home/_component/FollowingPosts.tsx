"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFollowingPosts";
import Loading from "../loading";

export default function FollowingPosts() {
  // const { data, isPending } = useQuery<IPost[]>({
  const { data, isPending } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  // if (isPending) {
  //   return <Loading />;
  // }

  return data?.map((post) => {
    return <Post key={post.postId} post={post} />;
  });
}
