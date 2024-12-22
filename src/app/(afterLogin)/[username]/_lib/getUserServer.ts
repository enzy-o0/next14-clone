import { User } from "@/model/User";
import { QueryFunction } from "@tanstack/react-query";
import { cookies } from "next/headers";

export const getUserServer: QueryFunction<User, [_1: string, string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      // 서버 쪽 캐싱 - react query X
      next: {
        tags: ["user", username],
      },
      credentials: "include",
      headers: { Cookie: cookies.toString() },
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
