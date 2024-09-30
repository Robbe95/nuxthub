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
  UseMutationReturnType<void, unknown, TDeleteParams, unknown, unknown>
  entityName: string
  getAll: () =>
  UseQueryReturnType<TEntityIndexShape[], any>
  post: () =>
  UseMutationReturnType<TEntityDetailShape, any, TPostParams, any, any>
  update: () =>
  UseMutationReturnType<NoInfer<TEntityDetailShape>, unknown, TUpdateParams, unknown, unknown>
}

type OnDeleteCallback<TEntity, TDeleteParams> = ({ data, mutation }: {
  data: NonNullable<TEntity>
  mutation: UseMutationReturnType<void, unknown, TDeleteParams, unknown, unknown>
}) => MaybePromise<void>

type OnPostCallback<TEntity, TPostParams> = ({ mutation }: {
  mutation: UseMutationReturnType<NoInfer<TEntity>, unknown, TPostParams, unknown, unknown>
}) => MaybePromise<void>

type OnUpdateCallback<TEntity, TUpdateParams> = ({ data, mutation }: {
  data: NonNullable<TEntity>
  mutation: UseMutationReturnType<NoInfer<TEntity>, unknown, TUpdateParams, unknown, unknown>
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
  let onDeleteCb: OnDeleteCallback<TEntityDetailShape, TDeleteParams> | null = null
  let onPostCb: OnPostCallback<TEntityDetailShape, TPostParams> | null = null
  let onUpdateCb: OnUpdateCallback<TEntityDetailShape, TUpdateParams> | null = null
  const currentEntity: TEntityDetailShape | null = null
  const currentEntities: TEntityIndexShape[] | null = null

  function onDelete(cb: OnDeleteCallback<TEntityDetailShape, TDeleteParams>) {
    onDeleteCb = cb
  }

  function onPost(cb: OnPostCallback<TEntityDetailShape, TPostParams>) {
    onPostCb = cb
  }

  function onUpdate(cb: OnUpdateCallback<TEntityDetailShape, TUpdateParams>) {
    onUpdateCb = cb
  }

  async function deleteEntity() {
    if (currentEntity == null) {
      throw new Error('No current entity found')
    }

    const deleteMutation = payload.delete()

    if (onDeleteCb != null) {
      await onDeleteCb({
        data: currentEntity,
        mutation: deleteMutation,
      })
    }
  }

  async function postEntity() {
    const postMutation = payload.post()

    if (onPostCb != null) {
      await onPostCb({
        mutation: postMutation,
      })
    }
  }

  async function updateEntity() {
    if (currentEntity == null) {
      throw new Error('No current entity found')
    }

    const updateMutation = payload.update()

    if (onUpdateCb != null) {
      await onUpdateCb({
        data: currentEntity,
        mutation: updateMutation,
      })
    }
  }

  return {
    getById: payload.getById,
    currentEntities,
    currentEntity,
    deleteEntity,
    getAll: payload.getAll,
    postEntity,
    updateEntity,
    onDelete,
    onPost,
    onUpdate,
  }
}
