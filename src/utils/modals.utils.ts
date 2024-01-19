//promise based modal

export interface PromiseRegisterResponse {
    res: APIRegisterResponse;
    status: number;
}

export interface APIRegisterResponse {
    message: string;
    type: string;
    errors: any
}

//toast notification

export interface ToastNotificationModal {
    type: "success" | "error" | "info" | "warning";
    isOpen: boolean;
    isAllowToPush: boolean;
    message: string;
    duration?: number;
    isClosable?: boolean;
}