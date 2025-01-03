// 'use server';

import axiosInstance from "@/lib/AxiosInstance";
import { getCurrentUser } from "../AuthService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFocusSession = async (data: any) => {
    try {
        const currentUser = await getCurrentUser();
        const userId = currentUser?.id;
    
        data.userId = userId;
        console.log(data);
        const { data: response } = await axiosInstance.post("/focusSession", data);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};


export const getActiveFocusSession = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error("Current user not found or ID is missing");
        }
        const { data: response } = await axiosInstance.get(`/focusSession/${currentUser.id}/active`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};