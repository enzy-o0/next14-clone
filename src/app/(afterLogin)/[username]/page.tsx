import { auth } from "@/auth";
import style from "./profile.module.scss";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserPosts } from "./_lib/getUserPosts";
import UserInfo from "./_components/UserInfo";
import UserPosts from "./_components/UserPosts";
import { getUser } from "./_lib/getUser";

// const user = {
//   id: "user1",
//   nickname: "유저",
//   image: "/user.png",
// };

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", username],
    queryFn: getUser,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", "user", username],
    queryFn: getUserPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  // <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/tranquangkhai-718075/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Khai TranQuang</a>님의 이미지 입니다.

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
