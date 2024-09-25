import style from "./message.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import "dayjs/locale/ko";
import Room from "./_component/Room";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Message() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
