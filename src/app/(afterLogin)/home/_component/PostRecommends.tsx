"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { getPostRecommends } from "../_lib/getPostRecommends";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/(afterLogin)/home/loading";

export default function PostRecommends() {
  // const { data } = useQuery<IPost[]>({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   staleTime: 60 * 1000, // fresh -> stale
  //   gcTime: 300 * 1000 // 기본 5분
  // });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isPending,
    isError,
  } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
    initialPageParam: 0,
    // 5로 하면 중간에 삭제된 게시물이 있을 수 있음
    // 마지막 게시물의 아이디
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  });

  const { ref, inView } = useInView({
    // 해당 div tag가 보이자 마자 호출되도록 처리
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      // !isFetching 데이터 중복 호출 방지를 위함
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, data, isFetching, hasNextPage, fetchNextPage]);


  // useInfiniteQuery 일 떄,
  // if (isPending) {
  //   return <Loading />;
  // }

  if (isError) {
    return "에러 났어요. 해결 해주세요.";
  }

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page?.map((post) => {
            console.log(post);
            return <Post key={post.postId} post={post} />;
          })}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
