"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getUserPosts } from "../_lib/getUserPosts";

type Props = {
  username: string;
};
export default function UserPosts({ username }: Props) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users", username]);
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  if (!user) return;
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
