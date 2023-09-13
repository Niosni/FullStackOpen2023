const Notification = ({message}) => {
    if (message === null) {
        return null
    } else if (!message.toLowerCase().includes("del")) {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification