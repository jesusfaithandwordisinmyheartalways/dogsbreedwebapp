





import React, { useEffect, useRef, useState } from 'react'
import './CountUpAnimation.css'

// Hook for animating count-up effect
const useCountUp = (end, shouldStart, duration = 2000) => {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!shouldStart) return

    const step = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const progressRatio = Math.min(progress / duration, 1)
      const currentCount = Math.floor(progressRatio * end)

      setCount(currentCount)

      if (progress < duration) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationRef.current = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationRef.current)
  }, [shouldStart, end, duration])

  return count
}

const CountUpAnimation = () => {
  const [startAnimation, setStartAnimation] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true)
          observer.disconnect() // stop observing after triggered
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const reviews = useCountUp(1023, startAnimation)
  const visits = useCountUp(399456, startAnimation)
  const clients = useCountUp(800789, startAnimation)



  return (
    <div className="CountUpAnimation-Container" ref={containerRef}>
      <div className={`CountUpAnimation-Wrapper ${startAnimation ? 'animate-header' : ''}`}>
        <div><h3>GLOBAL FEEDBACK FROM CLIENTS</h3></div>
      </div>

      <div className="CountUpAnimation-Wrapper-Two">
        <div className="CountBox box-one">
          <div>Reviews</div>
          <div className="count-number">{reviews.toLocaleString()}</div>
        </div>

        <div className="CountBox box-two">
          <div>Website Visits</div>
          <div className="count-number">{visits.toLocaleString()}</div>
        </div>

        <div className="CountBox box-three">
          <div>Return Clients</div>
          <div className="count-number">{clients.toLocaleString()}</div>
        </div>

      </div>



    </div>
  )
}




export default CountUpAnimation