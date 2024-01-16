export interface Button {
    type: string;
    content: string;
    isDisabled?: boolean;
    buttonStatus?: "normal" | "loading" | "success" | "error" | "disabled" | undefined;
}
