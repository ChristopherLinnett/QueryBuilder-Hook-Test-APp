import { memo } from 'react';
import { UseMutationResult } from '@tanstack/react-query';

type MutationBuilderProps<TVariables, TData, TError, TContext, P = undefined> = P extends undefined
  ? {
      useMutation: () => UseMutationResult<TData, TError, TVariables, TContext>;
      children: (result: UseMutationResult<TData, TError, TVariables, TContext>) => React.ReactElement | null;
    }
  : {
      useMutation: (params: P) => UseMutationResult<TData, TError, TVariables, TContext>;
      params: P;
      children: (result: UseMutationResult<TData, TError, TVariables, TContext>) => React.ReactElement | null;
    };

const MutationBuilderInner = <TVariables, TData, TError, TContext, P = undefined>(
  props: MutationBuilderProps<TVariables, TData, TError, TContext, P>
): React.ReactElement | null => {
  if ('params' in props) {
    return props.children(props.useMutation(props.params));
  }
  return props.children(props.useMutation());
};

const MutationBuilder = memo(MutationBuilderInner) as unknown as <
  TVariables,
  TData,
  TError,
  TContext,
  P = undefined
>(
  props: MutationBuilderProps<TVariables, TData, TError, TContext, P>
) => React.ReactElement | null;

export { MutationBuilder };