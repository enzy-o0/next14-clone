import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.scss";
// import { revalidatePath, revalidateTag } from "next/cache";
import { getPostRecommends } from "./_lib/getPostRecommends";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  // });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    // 필수 - cursor 값
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  // queryClient.getQueryData(["posts", "recommends"]);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
