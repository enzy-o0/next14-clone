"use client";

import { useState } from "react";
import style from "../search.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const [current, setCurrent] = useState("hot");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickHot = () => {
    setCurrent("hot");

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("f");

    // let url = `/search?q=${searchParams.get("q")}`;

    // if (searchParams.has('pf')) {
    //   url += `&pf=${searchParams.get("pf")}`;
    // }
    // router.replace(url);
  };
  const onClickNew = () => {
    setCurrent("new");

    // let url = `/search?q=${searchParams.get("q")}&f=live`;
    // router.replace(url);

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("f", "live");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div onClick={onClickHot}>
          인기
          <div className={style.tabIndicator} hidden={current === "new"}></div>
        </div>
        <div onClick={onClickNew}>
          최신
          <div className={style.tabIndicator} hidden={current === "hot"}></div>
        </div>
      </div>
    </div>
  );
}
