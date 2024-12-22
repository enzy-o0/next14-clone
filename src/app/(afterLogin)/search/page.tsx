import { Metadata, ResolvingMetadata } from "next";
import BackButton from "../_component/BackButton";
import SearchForm from "../_component/SearchForm";
import SearchResult from "./_component/SearchResult";
import Tab from "./_component/Tab";
import style from "./search.module.scss";

type SearchProps = {
  searchParams: { q: string; f?: string; pf?: string };
  parent: ResolvingMetadata;
};

// 동적 메타데이터 생성
export async function generateMetadata({
  searchParams,
  parent,
}: SearchProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `${q} - 검색 / Z`,
    description: `${q} - 검색 / Z`,
  };
}

export default function Search({ searchParams }: SearchProps) {
  // next 15에서는 searchParams await으로 가져와야함
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}
