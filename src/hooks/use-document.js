import { useState } from 'react'
import { firestore } from '../firebase'

export const useDocument = collection => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const add = async values => {
    setLoading(true)

    try {
      await firestore.collection(collection).add(values)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const update = async (id, newValues) => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).update(newValues)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async id => {
    setLoading(true)

    try {
      await firestore.collection(collection).doc(id).delete()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, add, update, remove }
}
