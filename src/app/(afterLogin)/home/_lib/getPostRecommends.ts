export async function getPostRecommends() {
  const res = await fetch("http://localhost:9090/api/postRecommend", {
    next: {
      tags: ["posts", "recommends"],
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
