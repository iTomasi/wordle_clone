const dateFormat = (dateISO: string) => {
    const dateTimestamp = new Date(dateISO).getTime();
    const dateNow = Date.now();

    const elapsedTime = (dateNow - dateTimestamp) / 1000;

    if (elapsedTime < 60) return `${Math.floor(elapsedTime)}s`
    else if (elapsedTime < 3600) return `${Math.floor(elapsedTime / 60)}mi`
    else if (elapsedTime < 86400) return `${Math.floor(elapsedTime / 60 / 60)}h`
    else if (elapsedTime < 604800) return `${Math.floor(elapsedTime / 60 / 60 / 24)}d`
    else if (elapsedTime < 31536000) return `${Math.floor(elapsedTime / 60 / 60 / 24 / 30)}mo`
    
    return `${Math.floor(elapsedTime / 60 / 60 / 24 / 365)}y`

};

export default dateFormat;