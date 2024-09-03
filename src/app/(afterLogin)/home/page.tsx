import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.scss";

const Home = () => {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        {/* <PostForm /> */}
      </TabProvider>
    </main>
  );
};

export default Home;
