"use client";

import style from "./logoutButton.module.scss";

export default function LogoutButton() {
  const me = {
    // 임시로 내 정보 있는것처럼
    id: "user1",
    nickname: "유저",
    image: "/user.png",
  };

  // <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/tranquangkhai-718075/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Khai TranQuang</a>님의 이미지 입니다.

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.image} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </button>
  );
}
