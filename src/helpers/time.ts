import moment from 'moment';
import 'moment/locale/ru'

export const convertTime = (number: number) => {
    const minutes: number = Math.floor(number / 60)
    const seconds: number = +(number % 60).toFixed()

    return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
}

export const messageSendTime = (createdAt: number) => {
    return moment(new Date(createdAt * 1000)).format('LT')
}