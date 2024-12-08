export async function getFollowingPosts() {
  const res = await fetch("http://localhost:9090/api/posts/followings", {
    // 서버 쪽 캐싱 - react query X
    next: {
      tags: ["posts", "followings"],
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
}
