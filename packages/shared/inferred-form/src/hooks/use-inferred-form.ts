import { zodResolver } from "@hookform/resolvers/zod";
import { type DefaultValues, type FieldValues, useForm } from "react-hook-form";
import type { z } from "zod";
import {
  type FormEntries,
  type GenericForm,
  inferFormDefaultValues,
} from "../form";
import {
  type InferredSchema,
  inferSchema,
  inferSchemaDefaultValues,
} from "../schema";

export type UseInferredFormParams<
  Form extends GenericForm,
  Schema extends InferredSchema<Form> = InferredSchema<Form>,
  Return extends FieldValues = z.infer<Schema>,
> = {
  defaultValues?: Partial<FormEntries<Form>>;
  config: Form;
  extend?: (schema: InferredSchema<Form>) => Schema;
  /**
   * @todo
   * Transform the value before it is set in the form.
   * @param value - The value to transform.
   * @returns The transformed value.
   */
  transform?: (value: z.infer<Schema>) => Return;
};

export const useInferredForm = <
  Config extends GenericForm,
  Schema extends InferredSchema<Config> = InferredSchema<Config>,
  Return extends FieldValues = z.infer<Schema>,
>({
  config,
  defaultValues: passedDefaultValues = {},
  extend = (schema: InferredSchema<Config>) => schema as Schema,
}: UseInferredFormParams<Config, Schema, Return>): ReturnType<
  typeof useForm<z.input<Schema>, unknown, z.output<Schema>>
> => {
  const schema = extend(inferSchema<Config>(config)) as Schema;

  const defaultValues = {
    ...inferSchemaDefaultValues(schema),
    ...inferFormDefaultValues<Config>(config),
    ...passedDefaultValues,
  } as DefaultValues<z.input<Schema>>;

  const form = useForm<z.input<Schema>, unknown, z.output<Schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
};
