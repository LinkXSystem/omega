import {
  TL,
  TM,
  TR,
  ML,
  MR,
  BL,
  BM,
  BR
} from './coordinate';

export interface AnchorPositionInterface {
  compute: Function;
  style: Record<string, number | string>;
}

export default {
  TL: {
    compute: TL,
    style: {
      transform: 'translate(-50%, -50%)'
    }
  },
  TM: {
    compute: TM,
    style: {
      transform: 'translate(-50%, -50%)',
      left: '50%',
    }
  },
  TR: {
    compute: TR,
    style: {
      transform: 'translate(50%, -50%)',
      right: '0',
    }
  },
  ML: {
    compute: ML,
    style: {
      transform: 'translate(-50%, -50%)',
      top: '50%',
    }
  },
  MR: {
    compute: MR,
    style: {
      transform: 'translate(50%, -50%)',
      right: '0',
      top: '50%',
    }
  },
  BL: {
    compute: BL,
    style: {
      transform: 'translate(-50%, 50%)',
      bottom: '0',
    }
  },
  BM: {
    compute: BM,
    style: {
      transform: 'translate(-50%, 50%)',
      left: '50%',
      bottom: '0',
    }
  },
  BR: {
    compute: BR,
    style: {
      transform: 'translate(50%, 50%)',
      right: '0',
      bottom: '0',
    }
  }
}
