import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser, signupUser } from "../services/AuthService";
import { useRouter } from "next/navigation";

export const useUserSignup = () => {
    const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await signupUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
    const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    //   router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
