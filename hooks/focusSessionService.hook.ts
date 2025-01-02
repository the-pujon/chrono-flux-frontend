import { createFocusSession } from "@/services/FocusSessionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useGetActiveFocusSession = () => useQueryClient().getQueryData(['GET_ACTIVE_FOCUS_SESSION']);