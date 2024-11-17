import { QueryFunction } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";

export const getSearchResult: QueryFunction<
  IPost[],
  [_1: string, _2: string, searchParams: { q: string; f?: string; pf?: string }]
> = async ({ queryKey }) => {
  // queryKey 자동으로 내려옴
  const [_1, _2, searchParams] = queryKey;
  const res = await fetch(
    `http://localhost:9090/api/search/${
      searchParams.q
    }?${searchParams.toString()}`,
    {
      // 서버 쪽 캐싱 - react query X
      next: {
        tags: ["posts", "search", searchParams.q],
      },
      cache: "no-store",
    }
  );

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
