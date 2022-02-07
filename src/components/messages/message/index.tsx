import React from 'react';

import moment from 'moment';
import 'moment/locale/ru'
import { useAppSelector } from '../../../hooks/redux';

import { MessagePictures } from '../messagePictures';

import { IMessage } from '../interface';

export const Message: React.FC<IMessage> = ({ id, from, text, pictures, createdAt, audio, audioDuration, editMessage }) => {
    const uid = useAppSelector(state => state.auth.uid)
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const audioRef = React.useRef<HTMLAudioElement>(null)
    const [play, setPlay] = React.useState(0)
    const [currentTime, setCurrentTime] = React.useState(0)

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [text])

    React.useEffect(() => {
        if (audioRef.current) {

            audioRef.current.addEventListener('playing', () => {
                setPlay(1)
            });
            audioRef.current.addEventListener('ended', () => {
                setPlay(0)
            });

            audioRef.current.addEventListener('timeupdate', () => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current?.currentTime)
                }
            })
        }
    }, [])

    const handleClick = () => {
        if (audioRef.current) {
            if (play === 1) {
                audioRef.current.pause()
                setPlay(2)
            } else {
                audioRef.current.play()
                setPlay(1)
            }
        }
    }

    const convertTime = (number: number) => {
        const mins = Math.floor(number / 60)
        const sec = (number % 60).toFixed()
        return `${mins < 10 ? '0' : ''}${mins}:${+sec < 10 ? '0' : ''}${sec}`
    }

    return (
        <div ref={scrollRef} className={`chat__message ${uid === from ? 'own' : ''}`}>
            <div className="chat__message-container">
                <div className="chat__message-buble">
                    <div className="chat__message-text">{text}</div>
                    {pictures?.length ?
                        <MessagePictures pictures={pictures} /> : null
                    }
                    {audio &&
                        <div className='chat__message-audio'>
                            <audio ref={audioRef} src={audio} style={{ display: 'none' }} preload="metadata"></audio>
                            <button className="chat__message-audio-button" onClick={handleClick}>
                                {(play === 0 || play === 2) &&
                                    <svg width="18" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.1576 6.7081L2.58579 0.20524C1.56433 -0.322864 0 0.189616 0 1.49581V14.4984C0 15.6702 1.45361 16.3765 2.58579 15.789L15.1576 9.28925C16.279 8.71115 16.2826 7.2862 15.1576 6.7081Z" fill="#8774E1" />
                                    </svg>
                                }
                                {play === 1 &&
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.14286 16H1.71429C0.767857 16 0 15.2321 0 14.2857V1.71429C0 0.767857 0.767857 0 1.71429 0H5.14286C6.08929 0 6.85714 0.767857 6.85714 1.71429V14.2857C6.85714 15.2321 6.08929 16 5.14286 16ZM16 14.2857V1.71429C16 0.767857 15.2321 0 14.2857 0H10.8571C9.91072 0 9.14286 0.767857 9.14286 1.71429V14.2857C9.14286 15.2321 9.91072 16 10.8571 16H14.2857C15.2321 16 16 15.2321 16 14.2857Z" fill="#8774E1" />
                                    </svg>
                                }
                            </button>
                            <div className="chat__message-audio-line">
                                <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.9817 1.2844C17.9817 0.575047 17.4067 0 16.6973 0V0C15.988 0 15.4129 0.575048 15.4129 1.2844V22.7156C15.4129 23.425 15.988 24 16.6973 24V24C17.4067 24 17.9817 23.425 17.9817 22.7156V1.2844ZM7.70642 6.88441C7.70642 6.17505 8.28147 5.60001 8.99083 5.60001V5.60001C9.70018 5.60001 10.2752 6.17505 10.2752 6.88441V17.9156C10.2752 18.625 9.70018 19.2 8.99083 19.2V19.2C8.28147 19.2 7.70642 18.625 7.70642 17.9156V6.88441ZM39.8165 8.48441C39.8165 7.77506 39.2415 7.20001 38.5321 7.20001V7.20001C37.8227 7.20001 37.2477 7.77506 37.2477 8.48441V15.5156C37.2477 16.225 37.8227 16.8 38.5321 16.8V16.8C39.2415 16.8 39.8165 16.225 39.8165 15.5156V8.48441ZM59.0826 10.0844C59.0826 9.37504 59.6576 8.79999 60.367 8.79999V8.79999C61.0764 8.79999 61.6514 9.37504 61.6514 10.0844V13.9156C61.6514 14.6249 61.0764 15.2 60.367 15.2V15.2C59.6576 15.2 59.0826 14.6249 59.0826 13.9156V10.0844ZM2.56881 10.0844C2.56881 9.37505 1.99376 8.8 1.2844 8.8V8.8C0.575047 8.8 0 9.37505 0 10.0844V13.9156C0 14.625 0.575047 15.2 1.2844 15.2V15.2C1.99376 15.2 2.56881 14.625 2.56881 13.9156V10.0844ZM75.7798 11.6844C75.7798 10.975 75.2048 10.4 74.4954 10.4V10.4C73.7861 10.4 73.211 10.975 73.211 11.6844V13.1156C73.211 13.8249 73.7861 14.4 74.4954 14.4V14.4C75.2048 14.4 75.7798 13.8249 75.7798 13.1156V11.6844ZM119.45 10.0844C119.45 9.37504 118.875 8.79999 118.165 8.79999V8.79999C117.456 8.79999 116.881 9.37504 116.881 10.0844V13.9156C116.881 14.6249 117.456 15.2 118.165 15.2V15.2C118.875 15.2 119.45 14.6249 119.45 13.9156V10.0844ZM137.431 10.0844C137.431 9.37503 138.006 8.79999 138.716 8.79999V8.79999C139.425 8.79999 140 9.37503 140 10.0844V13.9156C140 14.6249 139.425 15.2 138.716 15.2V15.2C138.006 15.2 137.431 14.6249 137.431 13.9156V10.0844ZM25.6881 6.88441C25.6881 6.17505 25.113 5.60001 24.4037 5.60001V5.60001C23.6943 5.60001 23.1193 6.17505 23.1193 6.88441V17.9156C23.1193 18.625 23.6943 19.2 24.4037 19.2V19.2C25.113 19.2 25.6881 18.625 25.6881 17.9156V6.88441ZM44.9542 6.88441C44.9542 6.17505 45.5292 5.60001 46.2386 5.60001V5.60001C46.9479 5.60001 47.523 6.17505 47.523 6.88441V17.9156C47.523 18.625 46.9479 19.2 46.2386 19.2V19.2C45.5292 19.2 44.9542 18.625 44.9542 17.9156V6.88441ZM68.0734 6.88441C68.0734 6.17505 67.4984 5.60001 66.789 5.60001V5.60001C66.0796 5.60001 65.5046 6.17505 65.5046 6.88441V17.9156C65.5046 18.625 66.0796 19.2 66.789 19.2V19.2C67.4984 19.2 68.0734 18.625 68.0734 17.9156V6.88441ZM88.6239 6.88441C88.6239 6.17505 89.1989 5.60001 89.9083 5.60001V5.60001C90.6176 5.60001 91.1927 6.17505 91.1927 6.88441V17.9156C91.1927 18.625 90.6176 19.2 89.9083 19.2V19.2C89.1989 19.2 88.6239 18.625 88.6239 17.9156V6.88441ZM111.743 6.88441C111.743 6.17505 111.168 5.60001 110.459 5.60001V5.60001C109.749 5.60001 109.174 6.17505 109.174 6.88441V17.9156C109.174 18.625 109.749 19.2 110.459 19.2V19.2C111.168 19.2 111.743 18.625 111.743 17.9156V6.88441ZM131.009 6.88441C131.009 6.17505 131.584 5.60001 132.294 5.60001V5.60001C133.003 5.60001 133.578 6.17505 133.578 6.88441V17.9156C133.578 18.625 133.003 19.2 132.294 19.2V19.2C131.584 19.2 131.009 18.625 131.009 17.9156V6.88441ZM30.8257 1.2844C30.8257 0.575047 31.4007 0 32.1101 0V0C32.8194 0 33.3945 0.575048 33.3945 1.2844V22.7156C33.3945 23.425 32.8194 24 32.1101 24V24C31.4007 24 30.8257 23.425 30.8257 22.7156V1.2844ZM55.2293 1.2844C55.2293 0.575047 54.6543 0 53.9449 0V0C53.2356 0 52.6605 0.575048 52.6605 1.2844V22.7156C52.6605 23.425 53.2356 24 53.9449 24V24C54.6543 24 55.2293 23.425 55.2293 22.7156V1.2844ZM80.9174 1.2844C80.9174 0.575048 81.4925 0 82.2018 0V0C82.9112 0 83.4862 0.575048 83.4862 1.2844V22.7156C83.4862 23.425 82.9112 24 82.2018 24V24C81.4925 24 80.9174 23.425 80.9174 22.7156V1.2844ZM97.6147 1.2844C97.6147 0.575048 97.0396 0 96.3303 0V0C95.6209 0 95.0459 0.575048 95.0459 1.2844V22.7156C95.0459 23.425 95.6209 24 96.3303 24V24C97.0396 24 97.6147 23.425 97.6147 22.7156V1.2844ZM102.752 1.2844C102.752 0.575048 103.327 0 104.037 0V0C104.746 0 105.321 0.575048 105.321 1.2844V22.7156C105.321 23.425 104.746 24 104.037 24V24C103.327 24 102.752 23.425 102.752 22.7156V1.2844ZM125.872 1.2844C125.872 0.575048 125.297 0 124.587 0V0C123.878 0 123.303 0.575048 123.303 1.2844V22.7156C123.303 23.425 123.878 24 124.587 24V24C125.297 24 125.872 23.425 125.872 22.7156V1.2844Z" fill="white" />
                                </svg>
                            </div>
                            <div className="chat__message-audio-time">
                                {play === 0 && audioDuration &&
                                    <>
                                        <p>
                                            {(audioDuration.minutes >= 10) ? audioDuration.minutes : '0' + audioDuration.minutes}
                                            :
                                            {(audioDuration.seconds >= 10) ? audioDuration.seconds : '0' + audioDuration.seconds}
                                        </p>
                                    </>
                                }
                                {
                                    (play === 1 || play === 2) && <p>{convertTime(currentTime)}</p>
                                }
                            </div>
                        </div>
                    }
                    {uid === from &&
                        <button className='chat__message-edit' onClick={() => editMessage(id)}>
                            <span></span>
                        </button>
                    }
                </div>
                <div className="chat__message-date">
                    {moment(new Date(createdAt * 1000)).format('LT')}
                </div>
            </div>
        </div >
    );
};