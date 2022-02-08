import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteMessage, saveChangeMessage, selectMessage, sendMessage } from '../../../store/slices/messagesSlice';
import { firebaseStorageAudio, firebaseStorageImage } from '../../../helpers/firebaseStorage';

import { Input } from '../../ui/input';
import { userFriends } from '../../../store/slices/userSlice';
import { Loader } from '../../ui/loader';
import { Timestamp } from 'firebase/firestore';
import { PreviewImg } from '../PreviewImg';
import { ChatFormRecord } from '../chatFormRecord';
import { ChatFormEditButtons } from '../chatFormEditButtons';

export const ChatForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const uid = useAppSelector(state => state.auth.uid)
    const dialogId = useAppSelector(store => store.dialogId.id)
    const userInfo = useAppSelector(store => store.user.userInfo)
    const meInfo = useAppSelector(store => store.user.meInfo)
    const messages = useAppSelector(store => store.messages.messages)
    const selectedMessage = useAppSelector(state => state.messages.selectMessage)
    const [value, setValue] = React.useState('')
    const [image, setImage]: any = React.useState([])
    const [previewImg, setPreviewImg] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(false)
    const [isRecording, setIsRecording] = React.useState(false)
    const [mediaRecorder, setMediaRecorder]: any = React.useState(null)
    const [audio, setAudio] = React.useState('')
    const [time, setTime] = React.useState({ s: 0, m: 0 })
    const [updateTime, setUpdateTime] = React.useState({ minutes: time.m, seconds: time.s })
    const [interv, setInterv]: any = React.useState()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let pictures: string[] = []
        setLoading(true)

        if (isRecording) {
            if (time.s >= 1) {
                mediaRecorder.stop()
            }
            clearInterval(interv)
        }

        if ((image?.length > 0 || value.trim()) && dialogId && uid) {
            await firebaseStorageImage(image).then(data => pictures = data)

            dispatch(sendMessage({
                id: dialogId,
                uid,
                value: value || '',
                pictures: pictures || [],
                audio: '',
                audioDuration: ''
            }))

            setValue('')
            setImage([])
            setPreviewImg([])
        }

        if (messages.length === 0 && dialogId && uid) {
            dispatch(userFriends({
                userInfo: userInfo,
                meInfo: meInfo,
                id: dialogId,
                uid,
                value: value || '',
                pictures: pictures || [],
                audio: audio || '',
            }))
        }

        setLoading(false)
        setIsRecording(false)
    }

    React.useEffect(() => {
        if (image) {
            setPreviewImg([...image].map(img => URL.createObjectURL(img)))
        }
    }, [image])

    React.useEffect(() => {
        setPreviewImg([])
        setValue('')
        setIsRecording(false)
        setImage([])
    }, [dialogId])

    React.useEffect(() => {
        const mes: any = messages.find((mess: any) => mess.id === selectedMessage)

        if (mes) {
            setValue(mes.text)
        }

    }, [selectedMessage, messages])

    React.useEffect(() => {

        if (updateTime.minutes === 10) {
            mediaRecorder.stop()
            clearInterval(interv)
        }

    }, [updateTime.minutes, interv, mediaRecorder])

    const removeImg = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
        e.preventDefault()

        setImage([...image].filter((img, i) => i !== index));
        setPreviewImg([...previewImg].filter((img, i) => i !== index));
    }

    const closeEdit = () => {
        dispatch(selectMessage(''))
        setValue('')
    }

    const saveChange = () => {
        const lastMessage: any = messages[messages.length - 1]

        if (value.trim() && dialogId && uid) {

            dispatch(saveChangeMessage({
                value,
                messageId: selectedMessage,
                id: dialogId,
                uid,
                lastMessageId: lastMessage.id
            }))

            dispatch(selectMessage(''))
            setValue('')
        }
    }

    const removeMessage = () => {

        if (dialogId && uid) {
            if (messages.length === 1) {
                dispatch(deleteMessage({
                    value: 'История очищена',
                    messageId: selectedMessage,
                    id: dialogId,
                    uid,
                    pictures: [],
                    audio: '',
                    createdAt: Timestamp.fromDate(new Date())
                }))
            } else {
                const { text, pictures, audio, createdAt }: any = messages.slice().sort((a: any, b: any) => a.createdAt - b.createdAt)[messages.length - 2]

                dispatch(deleteMessage({
                    value: text,
                    messageId: selectedMessage,
                    id: dialogId,
                    uid,
                    pictures,
                    audio,
                    createdAt: Timestamp.fromDate(new Date(createdAt * 1000))
                }))
            }
        }

        dispatch(selectMessage(''))
        setValue('')
    }

    const startRecording = (e: any) => {
        e.preventDefault()

        const nav: any = navigator

        nav.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia || nav.msGetUserMedia;

        if (nav.getUserMedia) {
            nav.getUserMedia({ audio: true }, onSuccesRecording, onErrorRecording)
        }

    }

    const onSuccesRecording = async (stream: any) => {
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        setInterv(setInterval(startTime, 1000))

        recorder.start()
        recorder.onstart = () => setIsRecording(true)
        recorder.onstop = () => setIsRecording(false)

        recorder.ondataavailable = async (e: any) => {
            const file: any = new File([e.data], 'audio.webm')
            setLoading(true)
            let audio: any = ''

            await firebaseStorageAudio(file).then(data => audio = data)

            if (dialogId && uid) {
                dispatch(sendMessage({
                    id: dialogId,
                    value: '',
                    uid,
                    pictures: [],
                    audio,
                    audioDuration: updateTime
                }))
            }

            setLoading(false)
            setMediaRecorder([])
            setIsRecording(false)
            setAudio('')
            setTime({ s: 0, m: 0 })
            setUpdateTime({ minutes: 0, seconds: 0 })
        }
    }

    const stopRecording = (e: any) => {
        e.preventDefault()

        clearInterval(interv)
        setTime({ s: 0, m: 0 })
        setUpdateTime({ minutes: 0, seconds: 0 })
        setMediaRecorder([])
        setAudio('')
        setIsRecording(false)
    }

    const onErrorRecording = (err: any) => {
        console.log(err);
    }

    const startTime = () => {

        if (updateTime.minutes === 10) {
            updateTime.minutes = 0;
            updateTime.seconds = 0;
        }
        if (updateTime.seconds === 60) {
            updateTime.minutes++;
            updateTime.seconds = 0
        }
        updateTime.seconds++

        return setTime({
            s: updateTime.seconds,
            m: updateTime.minutes,
        })
    }

    const setImages = (e: any) => {
        if (e.target.files.length <= 9) {
            setImage(e.target.files)
        } else {
            return
        }
    }

    return (
        <form className="chat__form" onSubmit={handleSubmit}>
            <div className="chat__form-container">
                {previewImg.length !== 0 && <PreviewImg previewImg={previewImg} removeImg={removeImg} />}
                <div className="chat__form-wrapper">
                    {!isRecording &&
                        <>
                            <Input
                                placeholder='Введите сообщение...'
                                value={value}
                                setValue={setValue}
                                className='chat__form-field'
                            />

                            {selectedMessage.length === 0 &&
                                <div className='chat__form-attachment'>
                                    <label htmlFor="photo">
                                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.4649 23.8718C10.3703 26.7216 5.39452 26.7103 2.31714 23.832C-0.759359 20.9553 -0.771482 16.3004 2.27574 13.4058L2.27318 13.4042L13.4667 2.93498L14.8666 1.62619C17.1849 -0.542064 20.9429 -0.542064 23.2612 1.62619C25.5796 3.79445 25.5796 7.30965 23.2612 9.47874L10.9223 20.8993L10.918 20.8961C9.39739 22.2673 6.97377 22.2576 5.4713 20.8595C3.96883 19.4605 3.95936 17.2054 5.43246 15.7918L5.42813 15.7869L6.80207 14.5098L13.6719 8.1188L15.045 9.39751L6.80207 17.0656C6.04305 17.7708 6.04305 18.9154 6.80207 19.6213C7.56109 20.3273 8.79183 20.3273 9.54996 19.6213L21.8621 8.16828L21.8586 8.16586L21.9052 8.12845C23.4509 6.6832 23.4509 4.33865 21.9052 2.89348C20.3596 1.44832 17.8549 1.44823 16.3093 2.89348L16.2679 2.93739L16.2653 2.93572L14.8664 4.24368L3.67216 14.713C1.3538 16.8812 1.3538 20.3964 3.67216 22.5647C5.99052 24.7329 9.74935 24.7329 12.0659 22.5647L21.8605 13.4042L23.2595 12.0962L24.6584 13.4042L23.2595 14.713L13.4667 23.8735C13.4667 23.8734 13.4649 23.8718 13.4649 23.8718Z" fill="#A09BB1" />
                                        </svg>
                                    </label>
                                    <input
                                        onChange={setImages}
                                        type="file"
                                        accept='image/jpeg,image/png,image/webp'
                                        multiple
                                        id='photo'
                                        style={{ display: 'none' }}
                                    />
                                </div>}
                        </>
                    }
                </div>
                {isRecording && <ChatFormRecord {...time} />}
            </div>
            {selectedMessage &&
                <ChatFormEditButtons closeEdit={closeEdit} saveChange={saveChange} removeMessage={removeMessage} />
            }
            {isRecording &&
                <button onClick={stopRecording} className='chat__form-button chat__form-btn'>
                    <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2386 12.5L24.3459 5.39276C25.218 4.5206 25.218 3.10653 24.3459 2.23366L22.7663 0.654119C21.8942 -0.21804 20.4801 -0.21804 19.6072 0.654119L12.5 7.76136L5.39276 0.654119C4.5206 -0.21804 3.10653 -0.21804 2.23366 0.654119L0.654119 2.23366C-0.21804 3.10582 -0.21804 4.51989 0.654119 5.39276L7.76136 12.5L0.654119 19.6072C-0.21804 20.4794 -0.21804 21.8935 0.654119 22.7663L2.23366 24.3459C3.10582 25.218 4.5206 25.218 5.39276 24.3459L12.5 17.2386L19.6072 24.3459C20.4794 25.218 21.8942 25.218 22.7663 24.3459L24.3459 22.7663C25.218 21.8942 25.218 20.4801 24.3459 19.6072L17.2386 12.5Z" fill="white" />
                    </svg>
                </button>
            }
            {!isRecording && value.length === 0 && selectedMessage.length === 0 && image.length === 0 && !loading &&
                <button onClick={startRecording} className='chat__form-btn'>
                    <svg width="18" height="25" viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 17.1875C11.7112 17.1875 13.9091 15.0889 13.9091 12.5V4.6875C13.9091 2.09863 11.7112 0 9 0C6.28875 0 4.09091 2.09863 4.09091 4.6875V12.5C4.09091 15.0889 6.28875 17.1875 9 17.1875ZM17.1818 9.375H16.3636C15.9116 9.375 15.5455 9.72461 15.5455 10.1562V12.5C15.5455 16.1523 12.2477 19.083 8.34597 18.7197C4.9454 18.4028 2.45455 15.4839 2.45455 12.2217V10.1562C2.45455 9.72461 2.08841 9.375 1.63636 9.375H0.818182C0.366136 9.375 0 9.72461 0 10.1562V12.1172C0 16.4941 3.27119 20.396 7.77273 20.9888V22.6562H4.90909C4.45705 22.6562 4.09091 23.0059 4.09091 23.4375V24.2188C4.09091 24.6504 4.45705 25 4.90909 25H13.0909C13.543 25 13.9091 24.6504 13.9091 24.2188V23.4375C13.9091 23.0059 13.543 22.6562 13.0909 22.6562H10.2273V21.0073C14.6102 20.4331 18 16.8408 18 12.5V10.1562C18 9.72461 17.6339 9.375 17.1818 9.375Z" fill="white" />
                    </svg>
                </button>
            }
            {(isRecording || value.length > 0 || image.length > 0) && selectedMessage.length === 0 && !loading &&
                <button className='chat__form-send chat__form-btn'>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.530248 0.396765C0.760104 0.191123 1.0444 0.058502 1.34785 0.0153579C1.65131 -0.0277863 1.96057 0.0204457 2.23726 0.154069L24.2553 10.8038C24.4781 10.9113 24.6664 11.0808 24.7982 11.2925C24.93 11.5042 25 11.7495 25 11.9999C25 12.2504 24.93 12.4957 24.7982 12.7074C24.6664 12.9191 24.4781 13.0886 24.2553 13.1961L2.23726 23.8458C1.97955 23.9703 1.69319 24.0209 1.40918 23.9921C1.12517 23.9634 0.854322 23.8563 0.625969 23.6825C0.397615 23.5087 0.22045 23.2748 0.113655 23.0062C0.00685854 22.7376 -0.0255001 22.4444 0.0200815 22.1585L1.64282 11.9999L0.0200815 1.84138C-0.0220934 1.57646 0.00257878 1.305 0.0917939 1.05238C0.181009 0.79975 0.331857 0.574191 0.530248 0.396765V0.396765ZM3.23481 12.8667L1.74987 22.1608L22.7567 11.9999L1.74987 1.83907L3.23481 11.1332H11.6184C11.8449 11.1332 12.0622 11.2245 12.2223 11.387C12.3825 11.5496 12.4725 11.7701 12.4725 11.9999C12.4725 12.2298 12.3825 12.4503 12.2223 12.6128C12.0622 12.7754 11.8449 12.8667 11.6184 12.8667H3.23481Z" fill="#A09BB1" />
                    </svg>
                </button>
            }
            {loading &&
                <button className='chat__form-btn'>
                    <Loader />
                </button>
            }
        </form >
    );
};