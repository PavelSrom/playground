import { useState, useEffect } from 'react'
import { firestore } from '../firebase'

export const useCollection = collection => {
  const [returnValue, setReturnValue] = useState({
    data: undefined,
    isError: false,
  })

  useEffect(() => {
    const unsubscribe = firestore.collection(collection).onSnapshot(
      snapshot => {
        const data = []

        snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }))

        setReturnValue(prev => ({ ...prev, data }))
      },
      err => {
        setReturnValue(prev => ({ ...prev, isError: err.message }))
      }
    )

    return () => {
      unsubscribe()
    }
  }, [collection])

  return returnValue
}
