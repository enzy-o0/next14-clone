"use client";

import Link from "next/link";
import style from "./post.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import "dayjs/locale/ko";
import ActionButtons from "./ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";

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

  // if (Math.random() > 0.5 && !noImage) {
  //   target.Images.push(
  //     {
  //       imageId: 1,
  //       link: faker.image.urlLoremFlickr(),
  //     },
  //     {
  //       imageId: 2,
  //       link: faker.image.urlLoremFlickr(),
  //     },
  //     {
  //       imageId: 3,
  //       link: faker.image.urlLoremFlickr(),
  //     },
  //     {
  //       imageId: 4,
  //       link: faker.image.urlLoremFlickr(),
  //     }
  //   );
  // }

  let target = post;

  if (post.Original) {
    target = post.Original;
  }

  const stopProPagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <PostArticle post={post}>
      {post.Original && (
        <div className={style.postReposted}>
          <svg
            viewBox="0 0 24 24"
            width={16}
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
          >
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          재게시했습니다
        </div>
      )}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopProPagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
          </Link>
          <div className={style.postShade}></div>
        </div>
        <div className={style.postBody}>
          <Link href={`/${target.User.id}`} onClick={stopProPagation}>
            <span className={style.postUserName}>{target.User.nickname}</span>
            &nbsp;
            <span className={style.postUserId}>@{target.User.id}</span>
            &nbsp; . &nbsp;
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </Link>
          {target.Parent && (
            <div>
              <Link
                onClick={stopProPagation}
                href={`/${target.Parent.User.id}`}
                style={{
                  color: `rgb(29, 155, 400)`,
                }}
              >
                @{target.Parent.User.id}
              </Link>
              &nbsp;님에게 보내는 답글
            </div>
          )}
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons white post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
