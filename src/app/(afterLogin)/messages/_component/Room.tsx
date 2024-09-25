"use client";
import { faker } from "@faker-js/faker";
import style from "@/app/(afterLogin)/messages/message.module.scss";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const user = {
  id: "hero",
  nickname: "히어로",
  Messages: [
    { roomId: 123, content: "안녕하세요", createdAt: new Date() },
    { roomId: 123, content: "hello", createdAt: new Date() },
    { roomId: 123, content: "Bonjour", createdAt: new Date() },
  ],
};
export default function Room() {
  const router = useRouter();

  function handleClick() {
    router.push(`/messages/${user.Messages?.at(-1)?.roomId}`);
  }
  return (
    <div className={style.room} onClickCapture={handleClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={style.rootChatInfo}>
        <div className={style.rootUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span> ・ &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow()}
          </span>
        </div>
        <div className={style.rootLastChat}>
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  );
}
