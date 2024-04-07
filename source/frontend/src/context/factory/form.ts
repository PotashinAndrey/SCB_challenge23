import type { CreateFormParams } from '@filledout/core';
import { createLib, ValidationVisibilityCondition } from '@filledout/core';

const lib = createLib({
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

const createForm = <V>(params: CreateFormParams<V>) => lib.createForm<V>(params);

export default createForm;
