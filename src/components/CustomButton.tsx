import { Button, ButtonProps, Spinner } from "@ui-kitten/components";
import React, { FC } from "react"
interface Props extends ButtonProps {
    appearance?: "filled" | "outline" | "ghost"
    size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant'
    status?: IUIKittenStatus
    isLoading?: boolean
}
const CustomButton: FC<Props> = (props) => {
    const { isLoading } = props;
    const status = props.status ? props.status : "primary";
    return (
        <Button
            status={status}
            accessoryRight={isLoading ? () => <Spinner size="small" status="basic" /> : props.accessoryRight}
            {...props}
        >
            {props.children}
        </Button>
    )
}
export default CustomButton;
export type IUIKittenStatus = 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';