import BackButton from "../_component/BackButton";
import Post from "../_component/Post";
import style from "./profile.module.scss";

export default function Profile() {
  const user = {
    id: "user1",
    nickname: "유저",
    image: "/user.png",
  };

  // <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/tranquangkhai-718075/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6491185">Khai TranQuang</a>님의 이미지 입니다.

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
