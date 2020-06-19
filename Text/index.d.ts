import "./styles.css";
import { ReactNode } from "react";
export interface TextProps {
    children?: ReactNode;
    className?: string;
    htmlFor?: string;
    isBlock?: boolean;
    isBold?: boolean;
    isSmaller?: boolean;
    isSmallest?: boolean;
    isUppercase?: boolean;
    tag?: string;
    text?: string;
    title?: string;
}
declare function Text({ children, className, htmlFor, isBlock, isBold, isSmaller, isSmallest, isUppercase, tag, text, title, }: TextProps): import("react").ReactElement<{
    className: string;
}, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
declare namespace Text {
    var displayName: string;
}
declare const _default: import("react").MemoExoticComponent<typeof Text>;
export default _default;
