import React, { useState } from 'react';

export function useForm<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  function handleChange(name: keyof T, value: string) {
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  return {
    register(name: keyof T) {
      return {
        value: data[name],
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
          const { value } = e.currentTarget;
          handleChange(name, value);
        }
      }
    },
    getData() { return data; }
  }
}
