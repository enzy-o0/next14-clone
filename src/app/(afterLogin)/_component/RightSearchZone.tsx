"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./rightSearchZone.module.scss";
import SearchForm from "./SearchForm";

export default function RightSearchZone() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");

    router.replace(`/search?${newSearchParams.toString()}`);

    // let url = `/search?q=${searchParams.get("q")}&pf=on`;
    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }
    // router.replace(url);
  };
  const handleChangeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("pf");

    router.replace(`/search?${newSearchParams.toString()}`);

    // let url = `/search?q=${searchParams.get("q")}`;

    // if (searchParams.has("f")) {
    //   url += `&f=${searchParams.get("f")}`;
    // }

    // router.replace(url);
  };

  if (pathname === "/explore") return null;
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={handleChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={handleChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
