import type {
  UseMutationReturnType,
  UseQueryReturnType,
} from '@tanstack/vue-query'

export interface EntityCrudParams<
  TEntityIndexShape,
  TEntityDetailShape,
  TDetailParams,
  TPostParams,
  TUpdateParams,
  TDeleteParams> {
  getById: (payload: TDetailParams) =>
  UseQueryReturnType<TEntityDetailShape, any>
  delete: () =>
  UseMutationReturnType<NoInfer<TEntityDetailShape>, unknown, TDeleteParams, unknown, unknown>
  entityName: string
  getAll: () =>
  UseQueryReturnType<TEntityIndexShape[], any>
  post: () =>
  UseMutationReturnType<TEntityDetailShape, any, TPostParams, any, any>
  update: () =>
  UseMutationReturnType<NoInfer<TEntityDetailShape>, unknown, TUpdateParams, unknown, unknown>
}
export function useEntityCrud<
  TEntityIndexShape,
  TEntityDetailShape,
  TDetailParams,
  TPostParams,
  TUpdateParams,
  TDeleteParams,
>(
  payload: EntityCrudParams<
    TEntityIndexShape,
    TEntityDetailShape,
    TDetailParams,
    TPostParams,
    TUpdateParams,
    TDeleteParams
  >,
) {
  return payload
}
