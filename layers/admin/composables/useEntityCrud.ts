import type {
  UseMutationReturnType,
  UseQueryReturnType,
} from '@tanstack/vue-query'
import type { MaybePromise } from '@trpc/server/unstable-core-do-not-import'

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

type OnDeleteCallback<TEntity> = ({ data }: {
  data: TEntity
}) => MaybePromise<void>

type OnPostCallback<TEntity> = ({ data }: {
  data: TEntity
}) => MaybePromise<void>

type OnUpdateCallback<TEntity> = ({ data }: {
  data: TEntity
}) => MaybePromise<void>

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
  let onDeleteCb: OnDeleteCallback<TEntityDetailShape> | null = null
  let onPostCb: OnPostCallback<TEntityDetailShape> | null = null
  let onUpdateCb: OnUpdateCallback<TEntityDetailShape> | null = null
  const currentEntity: TEntityDetailShape | null = null
  const currentEntities: TEntityIndexShape[] | null = null

  function getDeleteParams(payload: TDeleteParams) {
    return payload
  }

  function onDelete(cb: OnDeleteCallback<TEntityDetailShape>) {
    onDeleteCb = cb
  }

  function onPost(cb: OnPostCallback<TEntityDetailShape>) {
    onPostCb = cb
  }

  function onUpdate(cb: OnUpdateCallback<TEntityDetailShape>) {
    onUpdateCb = cb
  }

  async function deleteEntity(params: TDeleteParams) {
    const deleteMutation = payload.delete()

    const response = await deleteMutation.mutateAsync(params)

    if (onDeleteCb != null) {
      await onDeleteCb({
        data: response,
      })
    }
  }

  async function postEntity(params: TPostParams) {
    const postMutation = payload.post()

    const response = await postMutation.mutateAsync(params)

    if (onPostCb != null) {
      await onPostCb({
        data: response,
      })
    }
  }

  async function updateEntity(params: TUpdateParams) {
    const updateMutation = payload.update()

    const response = await updateMutation.mutateAsync(params)

    if (onUpdateCb != null) {
      await onUpdateCb({
        data: response,
      })
    }
  }

  return {
    deleteEntity,
    postEntity,
    updateEntity,
    onDelete,
    onPost,
    onUpdate,
  }
}
