export async function getFollowRecommends() {
  const res = await fetch("http://localhost:9090/api/users/followRecommends", {
    // 서버 쪽 캐싱 - react query X
    next: {
      tags: ["users", "followRecommends"],
    },
    credentials: 'include',
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
}
