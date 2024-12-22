import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.scss";
import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSinglePost } from "./_lib/getSinglePost";
import { getComments } from "./_lib/getComments";
import Comments from "./_component/Comments";
import { getUserServer } from "../../_lib/getUserServer";
import { User } from "@/model/User";
import { Post } from "@/model/Post";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, id } = await params;
  const [user, post]: [User, Post] = await Promise.all([
    getUserServer({
      queryKey: ["user", username],
    }),
    getSinglePostServer({
      queryKey: ["posts", id],
    }),
  ]);

  return {
    title: `Z에서 ${user.nickname} 님 : (${user.id})`,
    description: post.content,
    // openGraph: {
    //   images: "",
    //   title: "",
    // },
    // twitter: {},
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });

  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
