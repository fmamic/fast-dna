import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import {
    ComponentStyles,
    ComponentStyleSheet,
    CSSRules,
} from "@microsoft/fast-jss-manager";
import { CheckboxClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { applyTypeRampConfig } from "../utilities/typography";
import {
    applyLocalizedProperty,
    contrast,
    Direction,
    toPx,
} from "@microsoft/fast-jss-utilities";
import {
    disabledContrast,
    ensureNormalContrast,
    normalContrast,
} from "../utilities/colors";
import outlinePattern from "../patterns/outline";
import toggleFieldPattern from "../patterns/toggle-field";

const styles: ComponentStyles<CheckboxClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<CheckboxClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const backgroundColor: string = designSystem.backgroundColor;
    const foregroundColor: string = designSystem.foregroundColor;
    const direction: Direction = designSystem.direction;
    const checkboxColor: string = normalContrast(
        designSystem.contrast,
        foregroundColor,
        backgroundColor
    );
    const checkboxDisabled: string = disabledContrast(
        designSystem.contrast,
        foregroundColor,
        backgroundColor
    );

    return {
        checkbox: {
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
        },
        checkbox_input: {
            position: "absolute",
            width: "20px",
            height: "20px",
            appearance: "none",
            borderRadius: "2px",
            boxSizing: "border-box",
            margin: "0",
            zIndex: "1",
            background: backgroundColor,
            ...outlinePattern.rest,
            "&:hover": {
                ...outlinePattern.hover,
            },
            "&:focus": {
                outline: "none",
                ...outlinePattern.focus,
            },
            "&:checked": {
                "& + $checkbox_stateIndicator": {
                    "&::after, &::before": {
                        position: "absolute",
                        zIndex: "1",
                        content: '""',
                        borderRadius: toPx(designSystem.cornerRadius),
                        ...toggleFieldPattern.rest.stateIndicator.checked,
                        // background: checkboxColor,
                    },
                },
            },
            "&:indeterminate": {
                "& + $checkbox_stateIndicator": {
                    "&::before": {
                        position: "absolute",
                        zIndex: "1",
                        content: '""',
                        borderRadius: "2px",
                        transform: "none",
                        [applyLocalizedProperty("left", "right", direction)]: "5px",
                        top: "5px",
                        height: "10px",
                        width: "10px",
                        ...toggleFieldPattern.rest.stateIndicator.checked,
                    },
                },
            },
        },
        checkbox_stateIndicator: {
            position: "relative",
            borderRadius: "2px",
            display: "inline-block",
            width: "20px",
            height: "20px",
            flexShrink: "0",
            ...toggleFieldPattern.rest.stateIndicator.unchecked,
            "&::before, &::after": {
                width: "2px",
            },
            "&::before": {
                top: "4px",
                left: "11px",
                height: "12px",
                transform: "rotate(40deg)",
            },
            "&::after": {
                top: "9px",
                left: "6px",
                height: "6px",
                transform: "rotate(-45deg)",
            },
        },
        checkbox_label: {
            color: ensureNormalContrast(
                designSystem.contrast,
                foregroundColor,
                backgroundColor
            ),
            ...applyTypeRampConfig("t7"),
            [applyLocalizedProperty("marginLeft", "marginRight", direction)]: "8px",
        },
        checkbox__disabled: {
            cursor: "not-allowed",
            "& $checkbox_input": {
                ...outlinePattern.disabled,
                "&:checked, &:indeterminate": {
                    "& + $checkbox_stateIndicator": {
                        "&::after, &::before": {
                            ...toggleFieldPattern.disabled.stateIndicator.checked,
                        },
                    },
                },
            },
            "& $checkbox_label": {
                color: checkboxDisabled,
            },
        },
    };
};

export default styles;
