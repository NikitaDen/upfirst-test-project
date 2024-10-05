export function throttle<T extends (...args: any[]) => void>(func: T, limit: number) {
  let lastFunc: ReturnType<typeof setTimeout>
  let lastRan: number | undefined

  return function (...args): void {
    if (lastRan === undefined) {
      func(...args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - (lastRan as number) >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - (lastRan as number))
      )
    }
  } as T
}
