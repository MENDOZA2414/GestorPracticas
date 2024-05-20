const Error = (props) => {
  return (
    <div className="alert alert-danger" role="alert">
        {props.mensaje || 'Error'}
    </div>
  )
}

export default Error