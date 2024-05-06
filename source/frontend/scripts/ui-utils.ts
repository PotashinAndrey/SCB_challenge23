import type { SyntheticEvent, ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

export const preventDefault = <T extends SyntheticEvent<E>, E>(event: T): void => event.preventDefault();

export const useEditMode = (origin: string, originSet: (value: string) => void) => {
  const [editMode, editModeSet] = useState(false);
  const [value, valueSet] = useState<string>('');

  const openEditMode = useCallback(() => {
    valueSet(origin);
    editModeSet(true);
  }, [origin]);
  const closeEditMode = useCallback(() => editModeSet(false), []);

  const handleSave = useCallback(() => {
    originSet(value);
    editModeSet(false);
  }, [value]);
  const handleReset = useCallback(() => editModeSet(false), []);

  const valueChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => valueSet(e.target.value), []);

  return {
    editMode,
    openEditMode,
    closeEditMode,

    handleSave,
    handleReset,

    value,
    valueChange
  };
};
