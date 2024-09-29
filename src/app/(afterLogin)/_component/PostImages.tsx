import style from "./post.module.scss";
import Link from "next/link";
import cx from "classnames";

type PostImagesPropsType = {
  post: {
    postId: number;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    Images: any[];
  };
};

export default function PostImages({ post }: PostImagesPropsType) {
  if (!post.Images) return null;
  if (!post.Images.length) return null;

  if (post.Images.length === 1) {
    return (
      <Link
        href={`${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
        className={cx(style.postImageSection, style.oneImage)}
        style={{
          backgroundImage: `url(${post.Images[0].link})`,
          backgroundSize: "contain",
        }}
      >
        <img src={post.Images[0]?.link} alt="" />
      </Link>
    );
  }

  if (post.Images.length === 2) {
    return (
      <div className={cx(style.postImageSection, style.twoImage)}>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[0]?.link} alt="" />
        </Link>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[1]?.link} alt="" />
        </Link>
      </div>
    );
  }
  if (post.Images.length === 3) {
    return (
      <div className={cx(style.postImageSection, style.threeImage)}>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[0]?.link} alt="" />
        </Link>
        <div>
          <Link
            href={`${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[1].link})`,
              backgroundSize: "cover",
            }}
          >
            <img src={post.Images[1]?.link} alt="" />
          </Link>
          <Link
            href={`${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[2].link})`,
              backgroundSize: "cover",
            }}
          >
            <img src={post.Images[2]?.link} alt="" />
          </Link>
        </div>
      </div>
    );
  }
  if (post.Images.length === 4) {
    return (
      <div className={cx(style.postImageSection, style.fourImage)}>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[0].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[0]?.link} alt="" />
        </Link>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[1].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[1]?.link} alt="" />
        </Link>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[2].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[2]?.link} alt="" />
        </Link>
        <Link
          href={`${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
          style={{
            backgroundImage: `url(${post.Images[3].link})`,
            backgroundSize: "cover",
          }}
        >
          <img src={post.Images[3]?.link} alt="" />
        </Link>
      </div>
    );
  }

  return null;
}
