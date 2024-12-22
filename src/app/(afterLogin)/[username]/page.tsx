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
import { getUserServer } from "./_lib/getUserServer";

// const user = {
//   id: "user1",
//   nickname: "유저",
//   image: "/user.png",
// };

type Props = {
  params: { username: string };
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user = await getUserServer({
    queryKey: ["user", username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user", username],
    queryFn: getUserServer,
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
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
