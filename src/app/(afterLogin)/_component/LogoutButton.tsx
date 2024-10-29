"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.scss";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  // 클라이언트에서만 사용
  const { data: me } = useSession();

  console.log(me);

  // 임시로 내 정보 있는것처럼
  // const me = {
  //   id: "user1",
  //   nickname: "유저",
  //   image: "/user.png",
  // };

  if (!me?.user) {
    return null;
  }

  // <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/tranquangkhai-718075/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Khai TranQuang</a>님의 이미지 입니다.

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email as string} />
        {/* or  src={me.user?.image! as string} */}
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
