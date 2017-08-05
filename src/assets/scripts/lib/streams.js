import { solve } from 'lib/rpn';
import { times } from 'util/arrays';

export const AUGEND_INDEX = 0;
export const OPERATOR_INDEX = 1;
export const ADDEND_INDEX = 2;
export const BIT_DEPTH = 3;

export const evaluateStream = (stream, inventory) => {
  const leaves = [ ...inventory ];
  const numOperations = Math.trunc(stream.length / BIT_DEPTH);

  times(numOperations, i => {
    const start = i * BIT_DEPTH;
    const augend = leaves[stream[start + AUGEND_INDEX]];
    const addend = leaves[stream[start + ADDEND_INDEX]];
    const operator = stream[start + OPERATOR_INDEX];
    leaves.push(solve(augend, addend, operator));
  });

  return leaves;
};

export const getLocalIndex = (stream, cursor) => {
  const elementIndex = Math.trunc(cursor / BIT_DEPTH);
  return cursor - (elementIndex * BIT_DEPTH);
};
