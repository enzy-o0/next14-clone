import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Post from "../_component/Post";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.scss";
import { revalidatePath, revalidateTag } from "next/cache";

async function getPostRecommends() {
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

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  const dehydratedState = dehydrate(queryClient);

  // queryClient.getQueryData(["posts", "recommends"]);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <Post />
          <Post /> <Post /> <Post /> <Post /> <Post /> <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
