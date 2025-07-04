import { UseMutationResult } from "@tanstack/react-query";
import React, { memo } from "react";

type MutationBuilderProps<TData, TError, TVariables = void, TContext = unknown, P = undefined> =
  P extends undefined
  ? {
    useMutation: () => UseMutationResult<TData, TError, TVariables, TContext>;
    children: (result: UseMutationResult<TData, TError, TVariables, TContext>) => React.ReactElement | null;
  }
  : {
    useMutation: (params: P) => UseMutationResult<TData, TError, TVariables, TContext>;
    params: P;
    children: (result: UseMutationResult<TData, TError, TVariables, TContext>) => React.ReactElement | null;
  };

const MutationBuilder = <TData, TError, TVariables = void, TContext = unknown, P = undefined>(
  props: MutationBuilderProps<TData, TError, TVariables, TContext, P>
): React.ReactElement | null => {
  if ("params" in props) {
    return props.children(props.useMutation(props.params));
  }
  return props.children(props.useMutation());
};

export default memo(MutationBuilder);