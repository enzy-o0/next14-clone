"use client";

import { ReactNode } from "react";
import style from "./post.module.scss";
import { useRouter } from "next/navigation";
import { Post } from "@/model/Post";

type PostArticleType = {
  children: ReactNode;
  post: Post;
};

export default function PostArticle({ children, post }: PostArticleType) {
  const router = useRouter();

  let target = post;
  if (post.Original) {
    target = post.Original;
  }

  const handleClick = () => {
    router.push(`${post.User.id}/status/${target.postId}`);
  };

  // onClickCapture={handleClick}
  return (
    <article onClick={handleClick} className={style.post}>
      {children}
    </article>
  );
}
