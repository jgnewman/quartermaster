import "./styles.css";
import React from "react";
export interface AvatarProps {
    className?: string;
    isActive?: boolean;
    isCompact?: boolean;
    name?: string;
    showActivity?: boolean;
    url?: string;
}
declare function Avatar({ className, isActive, isCompact, name, showActivity, url, }: AvatarProps): JSX.Element;
declare namespace Avatar {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof Avatar>;
export default _default;
