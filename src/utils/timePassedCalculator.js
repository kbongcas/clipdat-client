const getTimePassed = (date) => {
    let diffTime = Math.abs(new Date().valueOf() - new Date(date).valueOf());
    let days = diffTime / (24 * 60 * 60 * 1000);
    let hours = (days % 1) * 24;
    let minutes = (hours % 1) * 60;
    let secs = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]

    return {
        days : days,
        hours : hours,
        minutes: minutes,
        seconds: secs
    } 
}

const getMinTimePassedAsText = (date) => {
    var timePassed = getTimePassed(date)
    console.log(timePassed)
    let timePassedText = `${timePassed.seconds} second${timePassed.seconds === 1 ? '' : 's'} ago`

    timePassedText = timePassed.minutes > 0
        ? `${timePassed.minutes} minute${timePassed.minutes === 1 ? '' : 's'} ago` : timePassedText;

    timePassedText = timePassed.hours > 0
        ? `${timePassed.hours} hour${timePassed.hours === 1 ? '' : 's'} ago` : timePassedText

    timePassedText = timePassed.days > 0
        ? `${timePassed.days} day${timePassed.days === 1 ? '' : 's'} ago` : timePassedText

    return timePassedText;
}

const getLocalDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
}

export const timePassedCalculator = {
    getTimePassed,
    getMinTimePassedAsText,
    getLocalDate
}