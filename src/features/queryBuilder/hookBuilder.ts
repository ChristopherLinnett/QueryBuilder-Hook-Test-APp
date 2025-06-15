import React, { memo } from "react";

type HookParams<F> = F extends (arg: infer P) => any ? P : never;
type HookReturn<F> = F extends (...args: any[]) => infer R ? R : never;

type HookBuilderProps<F extends (...args: any[]) => any> =
  Parameters<F>['length'] extends 0
  ? {
    hook: F;
    children: (result: HookReturn<F>) => React.ReactElement | null;
    params?: never;
  }
  : {
    hook: F;
    children: (result: HookReturn<F>) => React.ReactElement | null;
    params: HookParams<F>;
  };

const HookBuilder = <F extends (...args: any[]) => any>(
  props: HookBuilderProps<F>
): React.ReactElement | null => {
  if ("params" in props) {
    return props.children(props.hook(props.params));
  }
  return props.children(props.hook());
};

export default memo(HookBuilder);