import { Workspace } from "../workspace";
import { Box } from "../common";
import { Position } from '../../constants';

export default class AuxiliaryLine {
    workspace: Workspace
    type: 'x' | 'y';
    element: Box;

    constructor(workspace: Workspace, type) {
        this.workspace = workspace;
        this.type = type;
    }

    render() {
        const { workspace, type } = this;
        const { container } = workspace;
        this.element = new Box();

        const i = 1;

        switch (type) {
            // X 轴辅助线
            case 'x':
                this.element.setStyle({
                    position: Position.ABSOLUTE,
                    width: i,
                    height: window.innerHeight,
                    background: 'red'
                });
                break;
            // Y 轴辅助线
            case 'y':
                this.element.setStyle({
                    position: Position.ABSOLUTE,
                    width: window.innerWidth,
                    height: i,
                    background: 'red'
                });
                break;
        }

        this.element.setContainer(container);
    }

    update() {
        const { element } = this;
    }

}