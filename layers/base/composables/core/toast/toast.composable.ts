import { toast as vueSonnerToast } from '@base/components/core/sonner/state'
import AppToast from '@base/components/core/toast/AppToast.vue'
import type { Toast } from '@base/types/core/toast.type'
import { h, type VNode } from 'vue'

interface NamedToast {
  testId?: string
  title: string
  description?: string
}

interface UseToastReturnType {
  testId?: string
  custom: (toast: {
    duration?: number
    h: () => VNode
  }) => void
  error: (toast: NamedToast) => void
  show: (toast: Toast) => void
  success: (toast: NamedToast) => void
}

export function useToast(): UseToastReturnType {
  const DEFAULT_TOAST_DURATION = 10000

  function showErrorToast(toast: NamedToast): void {
    vueSonnerToast.custom(h(AppToast, {
      testId: toast.testId,
      title: toast.title,
      description: toast.description ?? null,
      icon: 'alertCircle',
      type: 'error',
    }), {
      duration: DEFAULT_TOAST_DURATION,
    })
  }

  function showSuccessToast(toast: NamedToast): void {
    vueSonnerToast.custom(h(AppToast, {
      testId: toast.testId,
      title: toast.title,
      description: toast.description ?? null,
      icon: 'checkmarkCircle',
      type: 'success',
    }), {
      duration: DEFAULT_TOAST_DURATION,
    })
  }

  function showToast(toast: Toast): void {
    vueSonnerToast.custom(h(AppToast, {
      testId: toast.testId,
      title: toast.title,
      action: toast.action,
      description: toast.description ?? null,
      icon: toast.icon,
      type: toast.type,
    }), {
      duration: toast.duration ?? DEFAULT_TOAST_DURATION,
    })
  }

  function customToast(toast: {
    duration?: number
    h: () => VNode
  }): void {
    vueSonnerToast.custom(toast.h(), {
      duration: toast.duration,
    })
  }

  return {
    custom: customToast,
    error: showErrorToast,
    show: showToast,
    success: showSuccessToast,
  }
}
