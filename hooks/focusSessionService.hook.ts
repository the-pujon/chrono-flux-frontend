import { createFocusSession, getActiveFocusSession, getFocusStreakByUserId, getTodayFocusSession, monthlyFocusSession, startFocusSession, updateFocusSession, updateFocusSessionStatus, weeklyFocusSession } from "@/services/FocusSessionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateFocusSession = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["CREATE_FOCUS_SESSION"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (data: any) => await createFocusSession(data),
        onSuccess: () => {
            toast.success("Focus session created successfully.");
            queryClient.invalidateQueries({ queryKey: ['GET_ACTIVE_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_TODAY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_WEEKLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_MONTHLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_FOCUS_STREAK_BY_USER_ID'] })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
};


export const useGetActiveFocusSession = () => {
    return useQuery({
      queryKey: ["GET_ACTIVE_FOCUS_SESSION"],
      queryFn: async () => await getActiveFocusSession(),
    });
  };
  

  export const useUpdateFocusSessionStatus = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["UPDATE_FOCUS_SESSION_STATUS"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (data: any) => await updateFocusSessionStatus(data),
        onSuccess: () => {
            toast.success("Done.");
            queryClient.invalidateQueries({ queryKey: ['GET_ACTIVE_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_TODAY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_WEEKLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_MONTHLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_FOCUS_STREAK_BY_USER_ID'] })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
};

export const useStartFocusSession = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["START_FOCUS_SESSION"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async () => await startFocusSession(),
        onSuccess: () => {
            toast.success("Session started.");
            queryClient.invalidateQueries({ queryKey: ['GET_ACTIVE_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_TODAY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_WEEKLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_MONTHLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_FOCUS_STREAK_BY_USER_ID'] })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
};

export const useUpdateFocusSession = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any, Error, FieldValues>({
        mutationKey: ["UPDATE_FOCUS_SESSION"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn: async (data: any) => await updateFocusSession(data),
        onSuccess: () => {
            toast.success("Focus session updated successfully.");
            queryClient.invalidateQueries({ queryKey: ['GET_ACTIVE_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_TODAY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_WEEKLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_MONTHLY_FOCUS_SESSION'] })
            queryClient.invalidateQueries({ queryKey: ['GET_FOCUS_STREAK_BY_USER_ID'] })
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
};

export const useTodayFocusSession = () => {
    return useQuery({
      queryKey: ["GET_TODAY_FOCUS_SESSION"],
      queryFn: async () => await getTodayFocusSession(),
    });
  };

  export const useWeeklyFocusSession = () => {
    return useQuery({
      queryKey: ["GET_WEEKLY_FOCUS_SESSION"],
      queryFn: async () => await weeklyFocusSession(),
    });
  };

  export const useMonthlyFocusSession = () => {
    return useQuery({
      queryKey: ["GET_MONTHLY_FOCUS_SESSION"],
      queryFn: async () => await monthlyFocusSession(),
    });
  };

  export const useGetFocusStreakByUserId = () => {
    return useQuery({
      queryKey: ["GET_FOCUS_STREAK_BY_USER_ID"],
      queryFn: async () => await getFocusStreakByUserId(),
    });
  };
;
