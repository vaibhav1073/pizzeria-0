

export default function LoadingSpinner() {
  return (
    <div className="container d-flex justify-content-center aling-content-between mt-5 row flex-wrap">
        <div className="spinner-grow text-warning mt-5 mr-2" role="status">
        </div>
        <div className="spinner-grow text-warning mt-5" role="status">
        </div>
        <div className="spinner-grow text-warning mt-5 ml-2" role="status">
        </div>
  <h4 className="sr-only  mt-3 container text-center">Loading Delicousness</h4>
    </div>
  )
}
