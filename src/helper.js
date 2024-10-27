const timeConverter = (timeInMinutes) => {
    const minutes = Math.floor(timeInMinutes / 60);
    const seconds = Math.floor(timeInMinutes % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

export default timeConverter