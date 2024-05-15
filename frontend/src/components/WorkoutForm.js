import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">Exercise Title:</label>
              <input 
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`form-control ${emptyFields.includes('title') ? 'is-invalid' : ''}`}
              />
              {emptyFields.includes('title') && <div className="invalid-feedback">Title is required.</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="load" className="form-label">Load (in kg):</label>
              <input 
                type="number"
                id="load"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={`form-control ${emptyFields.includes('load') ? 'is-invalid' : ''}`}
              />
              {emptyFields.includes('load') && <div className="invalid-feedback">Load is required.</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="reps" className="form-label">Reps:</label>
              <input 
                type="number"
                id="reps"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={`form-control ${emptyFields.includes('reps') ? 'is-invalid' : ''}`}
              />
              {emptyFields.includes('reps') && <div className="invalid-feedback">Reps are required.</div>}
            </div>

            <button className="btn btn-primary">Add Workout</button>
            {error && <div className="text-danger mt-2">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default WorkoutForm
