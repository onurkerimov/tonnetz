const createAnimationLoop = () => {
  let num: number | undefined
  return {
    request: (fn: FrameRequestCallback) => {
      num = requestAnimationFrame(fn)
    },
    cancel: () => {
      if(num) cancelAnimationFrame(num)
      num = undefined
    },
  }
}

export const ease = (options: {
  easingFunction?: (t: number) => number,
  duration?: number,
  from: number
  to: number,
  callback: (value: number) => void
}) => {
  const {
    easingFunction = (t: number) => t,
    duration = 1000,
    from,
    to,
    callback
  } = options
  const loop = createAnimationLoop()
  let startTime: number | undefined

  const animate: FrameRequestCallback = (currentTime) => {
    if (!startTime) startTime = currentTime
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)
    const easedProgress = easingFunction(progress)
    
    callback(from + (to - from) * easedProgress)
  
    if (progress < 1) {
      loop.request(animate)
    }
  }
  
  loop.request(animate)
  return loop.cancel
}


// export function easedStore(sourceStore, duration = 1000, easingFunction = t => t) {
//   const targetStore = store(sourceStore.get())
//   targetStore.effect(() => {
//     return sourceStore.subscribe((value) => ease({ 
//       from: targetStore.value, 
//       to: value,
//       duration,
//       easingFunction,
//       callback: (nextValue) => targetStore.set(nextValue)
//     }))
//   })
//   return targetStore
// }

// export const easedAtom = (...args) => atom.call(easedStore(...args))