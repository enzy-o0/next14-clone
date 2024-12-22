"use client";

import { useQuery } from "@tanstack/react-query";
import style from "../photoModal.module.scss";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  const postImages = post?.Images[0];

  if (!postImages) return;

  return (
    <div className={style.imageZone}>
      <img src={postImages.link} alt={postImages.Post?.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${postImages.link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white post={post} />
        </div>
      </div>
    </div>
  );
}
