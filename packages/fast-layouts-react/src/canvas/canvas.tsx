import * as React from "react";
import { CanvasProps, ICanvasHandledProps } from "./canvas.props";
import manageJss, { ComponentStyles, IManagedClasses, ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import Foundation, { HandledProps, IFoundationProps } from "@microsoft/fast-components-foundation-react";

export interface ICanvasClassNamesContract {
    canvas: string;
}

const styles: ComponentStyles<ICanvasClassNamesContract, undefined> = {
    canvas: {
        flex: "1",
        overflow: "hidden",
    }
};

/**
 * Grid Canvas - this is the main content area of the grid.
 */
class Canvas extends Foundation<
    CanvasProps,
    React.HTMLAttributes<HTMLDivElement>,
    undefined
> {
    /**
     * Default props for the Canvas component
     */
    public static defaultProps: ICanvasHandledProps = {
        minWidth: 300
    };

    /**
     * Handled prop enumeration
     */
    protected handledProps: HandledProps<CanvasProps> = {
        minWidth: void 0,
        managedClasses: void 0
    };

    /**
     * Generate the style attribute object
     */
    public renderStyleAttribute(): object {
        return {
            minWidth: `${this.props.minWidth}px`
        };
    }

    /**
     * Render the Canvas
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                className={super.generateClassNames(this.props.managedClasses.canvas)}
                data-grid-app="canvas"
                style={this.renderStyleAttribute()}
            >
                {this.props.children}
            </div>
        );
    }
}

export default manageJss(styles)(Canvas);
