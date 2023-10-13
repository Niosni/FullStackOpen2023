const Notification = ({message}) => {
  if (message === null) {
    return null
  } else if (message.toLowerCase().includes("err")
    || message.toLowerCase().includes("del")
  ) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification