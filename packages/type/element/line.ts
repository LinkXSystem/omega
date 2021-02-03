export type LineType = 'curved' | 'isometric' | 'orthogonal' | 'simple' | 'straight' | 'entity-relation';

export interface Line {
  uuid: string;
  type: LineType;
}
