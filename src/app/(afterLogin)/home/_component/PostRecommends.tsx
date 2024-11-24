"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Fragment } from "react";

export default function PostRecommends() {
  // const { data } = useQuery<IPost[]>({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   staleTime: 60 * 1000, // fresh -> stale
  //   gcTime: 300 * 1000 // 기본 5분
  // });

  const { data } = useInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분,
    initialPageParam: 0,
    // 5로 하면 중간에 삭제된 게시물이 있을 수 있음
    // 마지막 게시물의 아이디
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  return data?.pages.map((page, i) => {
    <Fragment key={i}>
      {page?.map((post) => {
        return <Post key={post.postId} post={post} />;
      })}
    </Fragment>;
  });
}
