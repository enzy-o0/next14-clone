import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import TabDecider from "./TabDecider";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  // });

  const dehydratedState = dehydrate(queryClient);

  // queryClient.getQueryData(["posts", "recommends"]);

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    // 필수 - cursor 값
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
