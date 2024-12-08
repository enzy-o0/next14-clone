import { QueryFunction } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";

export const getUserPosts: QueryFunction<
  IPost[],
  [_1: string, _2: string, string]
> = async ({ queryKey }) => {
  const [_1, _2, userName] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userName}/posts`, {
    // 서버 쪽 캐싱 - react query X
    next: {
      tags: ["posts", "user", userName],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // 캐시 초기화
  // 태그
  // revalidateTag("recommends")

  // 페이지 전체 새로고침
  // revalidatePath("/home")

  return res.json();
};
