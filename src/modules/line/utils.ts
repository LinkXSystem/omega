import CurvedLine from "./curved";
import StraightLine from "./straight";
import SimpleLine from "./simple";

class LineUtils {
    static getLineInstancebyType(type: string) {
        let instance;

        switch (type) {
            case 'straight':
                instance = new StraightLine();
                break;
            case 'simple':
                instance = new SimpleLine();
                break;
            default:
                instance = new CurvedLine();
        }

        return instance;
    }
}

export {
    LineUtils
}