"use client";

import { useRouter } from "next/navigation";
import style from "./login.module.scss";
import { FormEventHandler, useState } from "react";

// 클라이언트 컴포넌트 사용
import { signIn } from "next-auth/react";

// 서버 컴포넌트 사용
// import { signIn } from "@/auth";

export default function Page() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // naver, kakao도 있음
      // 일반 아이디, 비밀번호는 credentials
      const response = await signIn("credentials", {
        userName: id,
        password,
        // 서버 컴포넌트
        redirect: false,
        // redirect: true,
        // callbackUrl: "/home",
      });

      if (response?.code === "no_user") {
        setMessage("가입하지 않은 유저입니다.");
      } else if (response?.code === "wrong_password") {
        setMessage("비밀번호가 틀렸습니다");
      } else {
        // 클라이언트는 router
        router.replace("/home");
      }
    } catch (err) {
      console.error(err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다");
    }
  };

  const onClickClose = () => {
    setIsOpen(false);
    router.back;
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder="아이디를 입력해주세요"
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
          </div>
          <div className={style.message}>{message}</div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
