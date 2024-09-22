import Image from "next/image";
import styles from "./main.module.scss";
import Link from "next/link";
import MainImg from "../../../../public/mainImg.png";
/* <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=349597">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/kropekk_pl-114936/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=349597">Anna</a>님의 이미지 입니다. */

export default function Main() {
  return (
    <>
      <div className={styles.left}>
        <Image src={MainImg} alt="로고" width={640} />
      </div>
      <div className={styles.right}>
        <h1>지금 일어나고 있는 일</h1>
        <Link href="/i/flow/signup" className={styles.signup}>
          계정 만들기
        </Link>
        <h3>이미 가입하셨나요?</h3>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
      </div>
    </>
  );
}
