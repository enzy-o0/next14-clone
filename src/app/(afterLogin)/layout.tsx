import { ReactNode } from "react";
import style from "./layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";
/* <a href="https://pixabay.com/ko//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=369540">Pixabay</a>로부터 입수된 <a href="https://pixabay.com/ko/users/kropekk_pl-114936/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=369540">Anna</a>님의 이미지 입니다. */
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import TrendSection from "./_component/TrendSection";
import FollowRecommend from "./_component/FollowRecommend";
import RightSearchZone from "./_component/RightSearchZone";

type AfterLoginLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const AfterLoginLayout = ({ children, modal }: AfterLoginLayoutProps) => {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={Logo} alt="로고" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>
                개시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
};

export default AfterLoginLayout;
