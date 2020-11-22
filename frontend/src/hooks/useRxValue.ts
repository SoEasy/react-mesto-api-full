import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useRxValue<T>(stream$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = stream$.subscribe((newValue: T) => {
      setValue(newValue);
    });

    return () => subscription.unsubscribe();
  }, []);

  return value;
}
