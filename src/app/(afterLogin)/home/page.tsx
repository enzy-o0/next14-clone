import style from "./home.module.scss";

const Home = () => {
  return (
    <main className={style.main}>
      <Tab />
      <PostForm />
    </main>
  );
};

export default Home;
