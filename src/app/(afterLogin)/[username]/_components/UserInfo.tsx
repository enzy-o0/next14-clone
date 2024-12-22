"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import BackButton from "@/app/(beforeLogin)/_component/BackButton";

import style from "../profile.module.scss";
import { User } from "@/model/User";
import { getUser } from "../_lib/getUser";
import cx from "classnames";
import { useSession } from "next-auth/react";
import { MouseEventHandler } from "react";
import { Session } from "next-auth";

type Props = {
  username: string;
  session: Session | null;
};
export default function UserInfo({ username, session }: Props) {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ["user", username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale
    gcTime: 300 * 1000, // 기본 5분
  });

  // const { data: session } = useSession();

  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "post",
        }
      );
    },
    onMutate: (userId: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const idx = value.findIndex((v) => v.id === userId);

        if (idx > -1) {
          const shallow = [...value];
          shallow[idx] = {
            ...shallow[idx],
            Followers: [
              ...shallow[idx].Followers,
              { userId: session?.user?.email as string },
            ],
            _count: {
              ...shallow[idx]._count,
              Followers: shallow[idx]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData([
        "user",
        userId,
      ]);

      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["user", userId], shallow);
      }
    },
    onError: (error, userId: string) => {
      console.log(error);

      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const idx = value.findIndex((v) => v.id === userId);

        if (idx > -1) {
          const shallow = [...value];
          shallow[idx] = {
            ...shallow[idx],
            Followers: shallow[idx].Followers.filter(
              (v) => v.userId === session?.user?.email
            ),
            _count: {
              ...shallow[idx]._count,
              Followers: shallow[idx]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData([
        "user",
        userId,
      ]);

      if (value2) {
        const shallow = {
          ...value2,
          Followers: value2.Followers.filter(
            (v) => v.userId === session?.user?.email
          ),
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["user", userId], shallow);
      }
    },
  });

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "delete",
        }
      );
    },
    onMutate: (userId: string) => {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const idx = value.findIndex((v) => v.id === userId);

        if (idx > -1) {
          const shallow = [...value];
          shallow[idx] = {
            ...shallow[idx],
            Followers: shallow[idx].Followers.filter(
              (v) => v.userId === session?.user?.email
            ),
            _count: {
              ...shallow[idx]._count,
              Followers: shallow[idx]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData([
        "user",
        userId,
      ]);

      if (value2) {
        const shallow = {
          ...value2,
          Followers: value2.Followers.filter(
            (v) => v.userId === session?.user?.email
          ),
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers - 1,
          },
        };
        queryClient.setQueryData(["user", userId], shallow);
      }
    },
    onError: (error, userId: string) => {
      console.log(error);

      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);

      if (value) {
        const idx = value.findIndex((v) => v.id === userId);

        if (idx > -1) {
          const shallow = [...value];
          shallow[idx] = {
            ...shallow[idx],
            Followers: [
              ...shallow[idx].Followers,
              { userId: session?.user?.email as string },
            ],
            _count: {
              ...shallow[idx]._count,
              Followers: shallow[idx]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }

      const value2: User | undefined = queryClient.getQueryData([
        "user",
        userId,
      ]);

      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", userId], shallow);
      }
    },
  });

  console.log(error);
  console.dir(error);

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}>
            <img src={undefined} alt={username} />
          </div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div className={style.noSuchUser}>계정이 존재하지 않음</div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const followed = user.Followers?.find(
    (v) => v.userId === session?.user?.email
  );

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id} />
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {user.id !== session?.user?.email && (
            <button
              className={cx(style.followButton, followed && style.followed)}
              onClick={onFollow}
            >
              {followed ? "팔로잉" : "팔로우"}
            </button>
          )}
        </div>
        <div className={style.userFollower}>
          <div> {user._count.Followers} 팔로워</div>
          &nbsp;
          <div> {user._count.Followings} 팔로우 중</div>
        </div>
      </div>
    </>
  );
}
