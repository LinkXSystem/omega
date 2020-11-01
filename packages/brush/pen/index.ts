export default class Pen {
  static simple(context: CanvasRenderingContext2D, point: { x: number; y: number }) {
    const { x, y } = point;
    context.lineTo(x, y);
    context.stroke();
  }
}
