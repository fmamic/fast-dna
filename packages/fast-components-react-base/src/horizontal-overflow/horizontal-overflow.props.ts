import * as React from "react";
import {
    HorizontalOverflowClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";

/**
 * Scroll interface for consumers
 * 'start' is when the horizontal overflow scroll is all the way left in LTR (all the way right in RTL)
 * 'end' is when the horizontal overflow scroll is all the right in LTR (all the way left in RTL)
 */
export interface ScrollChange {
    start: boolean;
    end: boolean;
}

/**
 * Horizontal overflow interface for consumers
 * Included all properties found in ScrollChange
 * 'overflow' is true when there are enough items to cause overflow
 */
export interface HorizontalOverflowChange extends ScrollChange {
    overflow: boolean;
}

export interface HorizontalOverflowUnhandledProps
    extends React.HTMLAttributes<HTMLDivElement> {}
export interface HorizontalOverflowManagedClasses
    extends ManagedClasses<HorizontalOverflowClassNameContract> {}
export interface HorizontalOverflowHandledProps extends HorizontalOverflowManagedClasses {
    /**
     * The horizontal overflow content
     */
    children?: React.ReactNode | React.ReactNode[];

    /**
     * The duration the scroll movement should last
     */
    scrollDuration?: number;

    /**
     * Callback for on horizontal overflow change
     */
    onHorizontalOverflowChange?: (changeObject: HorizontalOverflowChange) => void;

    /**
     * Callback for on scroll change
     */
    onScrollChange?: (scrollObject: ScrollChange) => void;
}

export type HorizontalOverflowProps = HorizontalOverflowHandledProps &
    HorizontalOverflowUnhandledProps;
