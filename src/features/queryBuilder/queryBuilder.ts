import { memo } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

type QueryBuilderProps<TData, TError, P = undefined> = P extends undefined
  ? {
      useQuery: () => UseQueryResult<TData, TError>;
      children: (result: UseQueryResult<TData, TError>) => React.ReactElement | null;
    }
  : {
      useQuery: (params: P) => UseQueryResult<TData, TError>;
      params: P;
      children: (result: UseQueryResult<TData, TError>) => React.ReactElement | null;
    };

const QueryBuilder = <TData, TError, P = undefined>(
  props: QueryBuilderProps<TData, TError, P>
): React.ReactElement | null => {
  if ('params' in props) {
    return props.children(props.useQuery(props.params));
  }
  return props.children(props.useQuery());
};

const MemoizedQueryBuilder = memo(QueryBuilder) as typeof QueryBuilder;

export { MemoizedQueryBuilder as QueryBuilder };