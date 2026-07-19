import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export function useFormWithReinitialize({
  defaultValues,
  enableReinitialize = false,
  ...rest
}) {
  const methods = useForm({ defaultValues, ...rest });
  const { reset } = methods;
  const defaultValuesKey = JSON.stringify(defaultValues);

  const defaultValuesRef = useRef(defaultValues);

  useEffect(() => {
    defaultValuesRef.current = defaultValues;
  }, [defaultValues, defaultValuesKey]);

  useEffect(() => {
    if (enableReinitialize) {
      reset(defaultValuesRef.current);
    }
  }, [defaultValuesKey, enableReinitialize, reset]);

  return methods;
}
