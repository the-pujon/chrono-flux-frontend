import { createFocusSession, getActiveFocusSession, startFocusSession, updateFocusSession, updateFocusSessionStatus } from "@/services/FocusSessionService";
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
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
};