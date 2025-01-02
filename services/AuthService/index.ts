"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/lib/AxiosInstance";


export const signupUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    // console.log(data.data)

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
    }

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};