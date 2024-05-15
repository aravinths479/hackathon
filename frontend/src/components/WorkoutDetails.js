import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [showModal, setShowModal] = useState(false)
  const [editedTitle, setEditedTitle] = useState(workout.title)
  const [editedLoad, setEditedLoad] = useState(workout.load)
  const [editedReps, setEditedReps] = useState(workout.reps)
  const [error, setError] = useState(null)

  const handleEdit = () => {
    setShowModal(true)
  }

  const handleDelete = async () => {
    if (!user) return;
    
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmitEdit = async () => {
    // Handle submission logic
  }

  return (
    <div className="d-flex">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{workout.title}</h5>
          <p className="card-text"><strong>Load (kg): </strong>{workout.load}</p>
          <p className="card-text"><strong>Reps: </strong>{workout.reps}</p>
          <div className="d-flex justify-content-between">
            {user && (
              <>
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for editing */}
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Workout</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              {/* Edit form */}
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-3">
                  <label htmlFor="editedTitle" className="form-label">Exercise Title:</label>
                  <input 
                    type="text"
                    id="editedTitle"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedLoad" className="form-label">Load (in kg):</label>
                  <input 
                    type="number"
                    id="editedLoad"
                    value={editedLoad}
                    onChange={(e) => setEditedLoad(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedReps" className="form-label">Reps:</label>
                  <input 
                    type="number"
                    id="editedReps"
                    value={editedReps}
                    onChange={(e) => setEditedReps(e.target.value)}
                    className="form-control"
                  />
                </div>
              </form>
              {error && <div className="text-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmitEdit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkoutDetails
