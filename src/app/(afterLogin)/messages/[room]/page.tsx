import { faker } from "@faker-js/faker";
import style from "./chatRoom.module.scss";
import Link from "next/link";
import BackButton from "../../_component/BackButton";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const user = {
  id: "hero",
  nickname: "히어로",
  image: faker.image.avatar(),
};

const messages = [
  {
    messageId: 1,
    roomId: 123,
    id: "user1",
    content: "안녕하세요",
    createdAt: new Date(),
  },
  {
    messageId: 2,
    roomId: 123,
    id: "hero",
    content: "hello",
    createdAt: new Date(),
  },
  {
    messageId: 3,
    roomId: 123,
    id: "user1",
    content: "Bonjour",
    createdAt: new Date(),
  },
];
export default function ChatRoom() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <div>
          <h2>{user.nickname}</h2>
        </div>
      </div>
      <Link href={user.nickname} className={style.userInfo}>
        <img src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </Link>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "user1") {
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }

          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
