"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async (
  prevState: { message: string | null },
  formData: FormData
) => {
  console.log(formData.get("id"));
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return {
      message: "아이디를 입력해주세요",
    };
  }

  if (
    !formData.get("nickname") ||
    !(formData.get("nickname") as string)?.trim()
  ) {
    return {
      message: "닉네임을 입력해주세요",
    };
  }

  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    console.log(formData.get("password"));
    return {
      message: "패스워드를 입력해주세요",
    };
  }

  if (!formData.get("image")) {
    return {
      message: "이미지를 선택해주세요",
    };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        // cookie 전달
        credentials: "include",
      }
    );

    console.log(response.status);

    if (response.status === 403) {
      return { message: "이미 사용 중인 아이디입니다." };
    }
    console.log(await response.json());
    shouldRedirect = true;

    console.log(formData);

    await signIn("credentials", {
      userName: formData.get("id"),
      password: formData.get("password"),
      // 서버 컴포넌트
      redirect: false,
    });
  } catch (e) {
    console.error(e);

    return {
      message: "회원가입에 실패하였습니다.",
    };
  }

  if (shouldRedirect) {
    redirect("/home"); // try catch 문에서 사용 X
  }

  return { message: null };
};
