import UUID from "../../packages/uuid";

export class Element {
  uuid: string;
  type: string;

  constructor(type: string) {
    this.uuid = UUID.generate();
    this.type = type;
  }
}
