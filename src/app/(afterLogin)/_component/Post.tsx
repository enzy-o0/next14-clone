"use client";

import Link from "next/link";
import style from "./post.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type PostType = {
  noImage?: boolean;
  post: Post;
};

export default function Post({ noImage, post }: PostType) {
  // const target = {
  //   postId: 1,
  //   User: {
  //     id: "elonmusk",
  //     nickname: "Elon Musk",
  //     image: "/yRsRRjGO.jpg",
  //   },
  //   content: "next14 적응하기",
  //   createdAt: new Date(),
  //   Images: [] as any,
  // };

  const target = post;

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
      {
        imageId: 1,
        link: faker.image.urlLoremFlickr(),
      },
      {
        imageId: 2,
        link: faker.image.urlLoremFlickr(),
      },
      {
        imageId: 3,
        link: faker.image.urlLoremFlickr(),
      },
      {
        imageId: 4,
        link: faker.image.urlLoremFlickr(),
      }
    );
  }

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
          </Link>
          <div className={style.postShade}></div>
        </div>
        <div className={style.postBody}>
          <Link href={`/${target.User.id}`}>
            <span className={style.postUserName}>{target.User.nickname}</span>
            &nbsp;
            <span className={style.postUserId}>@{target.User.id}</span>
            &nbsp; . &nbsp;
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </Link>
          <div>{target.content}</div>
          <div>
            <PostImages post={target} />
          </div>
          <ActionButtons white />
        </div>
      </div>
    </PostArticle>
  );
}
