const Notification = ({ msg }) => {
  if (msg === null) {
    return null
  }
  const msgContent = msg[0]
  const msgClass = msg[1]

  return (
    <div className={msgClass} >
      {msgContent}
    </div>
  )
}

export default Notification