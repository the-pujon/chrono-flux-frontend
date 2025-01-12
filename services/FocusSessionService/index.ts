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

export const updateFocusSessionStatus = async ( status: string) => {
    const currentUser = await getCurrentUser();
    try {
        const { data: response } = await axiosInstance.put(`/focusSession/${currentUser?.id}/status`, { status });
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export const startFocusSession = async () => {
    console.log("startFocusSession");
    const currentUser = await getCurrentUser();
    try {
        const { data: response } = await axiosInstance.put(`/focusSession/${currentUser?.id}/start`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateFocusSession = async (data: any) => {
    try {
        const currentUser = await getCurrentUser();
        const id = currentUser?.id;
        const { data: response } = await axiosInstance.put(`/focusSession/${id}`, data);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getTodayFocusSession = async () => {
    try {
        const currentUser = await getCurrentUser();

        console.log("getTodayFocusSession", currentUser)
        if (!currentUser || !currentUser.id) {
            throw new Error("Current user not found or ID is missing");
        }
        const { data: response } = await axiosInstance.get(`/focusSession/${currentUser.id}/today`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export const weeklyFocusSession = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error("Current user not found or ID is missing");
        }
        const { data: response } = await axiosInstance.get(`/focusSession/${currentUser.id}/weekly`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export const monthlyFocusSession = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error("Current user not found or ID is missing");
        }
        const { data: response } = await axiosInstance.get(`/focusSession/${currentUser.id}/monthly`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getFocusStreakByUserId = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error("Current user not found or ID is missing");
        }
        const { data: response } = await axiosInstance.get(`/focusSession/${currentUser.id}/streak`);
        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error);
    }
};