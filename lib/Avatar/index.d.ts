/// <reference types="react" />
export interface AvatarProps {
    className?: string;
    isActive?: boolean;
    showActivity?: boolean;
    url?: string;
}
declare function Avatar({ className, isActive, showActivity, url, }: AvatarProps): JSX.Element;
declare namespace Avatar {
    var displayName: string;
}
export default Avatar;
