"use client";

import { ReactNode } from "react";
import style from "./post.module.scss";
import { useRouter } from "next/navigation";

type PostArticleType = {
  children: ReactNode;
  post: {
    postId: number;
    User: {
      id: number;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    Images: any[];
  };
};

export default function PostArticle({ children, post }: PostArticleType) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${post.User.id}/status/${post.postId}`);
  };

  return (
    <article onClickCapture={handleClick} className={style.post}>
      {children}
    </article>
  );
}
