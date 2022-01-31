import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteMessage, saveChangeMessage, selectMessage, sendMessage } from '../../../store/slices/messagesSlice';
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { Input } from '../../ui/input';
import { userFriends } from '../../../store/slices/userSlice';
import { Loader } from '../../ui/loader';

export const ChatForm: React.FC = () => {
    const [value, setValue] = React.useState('')
    const uid = useAppSelector(state => state.auth.uid)
    const dialogId = useAppSelector(store => store.dialogId.id)
    const userInfo = useAppSelector(store => store.user.userInfo)
    const meInfo = useAppSelector(store => store.user.meInfo)
    const messages = useAppSelector(store => store.messages.messages)
    const dispatch = useAppDispatch()
    const [image, setImage]: any = React.useState([])
    const [previewImg, setPreviewImg] = React.useState<string[]>([])
    const [loading, setLoading] = React.useState(false)
    const selectedMessage = useAppSelector(state => state.messages.selectMessage)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url: string[] = []
        setLoading(true)

        if (image?.length !== 0) {
            for (let i = 0; i < image.length; i++) {
                const imgRef = ref(
                    storage,
                    `images/${new Date().getTime()} - ${image[i].name}`
                );

                const snap = await uploadBytes(imgRef, image[i])
                const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
                url.push(dlUrl)
            }

            dispatch(sendMessage({
                id: dialogId,
                value: value || '',
                uid,
                pictures: url || []
            }))

            setValue('')
            setImage([])
            setPreviewImg([])
        }

        if (value.trim()) {
            dispatch(sendMessage({
                id: dialogId,
                value: value || '',
                uid,
                pictures: url || []
            }))

            setValue('')
            setImage([])
            setPreviewImg([])
        }

        if (messages.length === 0) {
            dispatch(userFriends({
                userInfo: userInfo,
                meInfo: meInfo,
                id: dialogId,
                uid,
                value: value || '',
                pictures: url || []
            }))
        }

        setLoading(false)
    }

    React.useEffect(() => {
        if (image) {
            setPreviewImg([...image].map(img => URL.createObjectURL(img)))
        }
    }, [image])

    React.useEffect(() => {

        if (previewImg.length || value) {
            setPreviewImg([])
            setValue('')
        }

    }, [dialogId])

    const removeImg = (e: React.MouseEvent<SVGSVGElement>, index: number) => {
        e.preventDefault()

        setImage([...image].filter((img, i) => i !== index));
        setPreviewImg([...previewImg].filter((img, i) => i !== index));
    }

    React.useEffect(() => {
        const mes: any = messages.find((mess: any) => mess.id === selectedMessage)

        if (mes) {
            setValue(mes.text)
        }

    }, [selectedMessage])

    const closeEdit = () => {
        dispatch(selectMessage(''))
        setValue('')
    }

    const saveChange = () => {
        if (value.trim()) {
            dispatch(saveChangeMessage({
                value,
                id: selectedMessage
            }))

            dispatch(selectMessage(''))
            setValue('')
        }
    }

    const removeMessage = () => {
        dispatch(deleteMessage(selectedMessage))

        dispatch(selectMessage(''))
        setValue('')
    }

    return (
        <form className="chat__form" onSubmit={(e) => handleSubmit(e)}>
            {previewImg.length !== 0 &&
                <div className="chat__form-imgs">
                    {previewImg.map((item: string, index: number) => (
                        <div
                            className="chat__form-img"
                            key={index}
                            style={{ backgroundImage: `url(${item})` }}
                        >
                            <svg onClick={(e) => removeImg(e, index)} width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9286 36.5625H26.0714C26.3556 36.5625 26.6281 36.4514 26.829 36.2536C27.03 36.0558 27.1429 35.7875 27.1429 35.5078V16.5234C27.1429 16.2437 27.03 15.9755 26.829 15.7777C26.6281 15.5799 26.3556 15.4688 26.0714 15.4688H23.9286C23.6444 15.4688 23.3719 15.5799 23.171 15.7777C22.97 15.9755 22.8571 16.2437 22.8571 16.5234V35.5078C22.8571 35.7875 22.97 36.0558 23.171 36.2536C23.3719 36.4514 23.6444 36.5625 23.9286 36.5625ZM38.5714 7.03125H31.2134L28.1777 2.04785C27.7967 1.42296 27.2578 0.905881 26.6134 0.546993C25.9691 0.188106 25.2412 -0.000346587 24.5009 4.78517e-07H15.4991C14.7591 -4.29582e-05 14.0316 0.188554 13.3876 0.547426C12.7436 0.906299 12.2049 1.42322 11.8241 2.04785L8.78661 7.03125H1.42857C1.04969 7.03125 0.686328 7.17941 0.418419 7.44313C0.15051 7.70686 0 8.06454 0 8.4375L0 9.84375C0 10.2167 0.15051 10.5744 0.418419 10.8381C0.686328 11.1018 1.04969 11.25 1.42857 11.25H2.85714V40.7812C2.85714 41.9001 3.30867 42.9732 4.1124 43.7644C4.91613 44.5555 6.00622 45 7.14286 45H32.8571C33.9938 45 35.0839 44.5555 35.8876 43.7644C36.6913 42.9732 37.1429 41.9001 37.1429 40.7812V11.25H38.5714C38.9503 11.25 39.3137 11.1018 39.5816 10.8381C39.8495 10.5744 40 10.2167 40 9.84375V8.4375C40 8.06454 39.8495 7.70686 39.5816 7.44313C39.3137 7.17941 38.9503 7.03125 38.5714 7.03125ZM15.3429 4.47451C15.3906 4.39628 15.4582 4.33159 15.5389 4.28676C15.6197 4.24193 15.7109 4.21849 15.8036 4.21875H24.1964C24.289 4.21865 24.38 4.24215 24.4606 4.28697C24.5412 4.3318 24.6086 4.39641 24.6563 4.47451L26.2152 7.03125H13.7848L15.3429 4.47451ZM32.8571 40.7812H7.14286V11.25H32.8571V40.7812ZM13.9286 36.5625H16.0714C16.3556 36.5625 16.6281 36.4514 16.829 36.2536C17.03 36.0558 17.1429 35.7875 17.1429 35.5078V16.5234C17.1429 16.2437 17.03 15.9755 16.829 15.7777C16.6281 15.5799 16.3556 15.4688 16.0714 15.4688H13.9286C13.6444 15.4688 13.3719 15.5799 13.171 15.7777C12.97 15.9755 12.8571 16.2437 12.8571 16.5234V35.5078C12.8571 35.7875 12.97 36.0558 13.171 36.2536C13.3719 36.4514 13.6444 36.5625 13.9286 36.5625Z" fill="#FFFFFF" />
                            </svg>
                        </div>
                    ))}
                </div>
            }
            <div className="chat__form-wrapper">
                {selectedMessage.length === 0 &&
                    <div className='chat__form-icon chat__form-attachment'>
                        <label htmlFor="photo">
                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4649 23.8718C10.3703 26.7216 5.39452 26.7103 2.31714 23.832C-0.759359 20.9553 -0.771482 16.3004 2.27574 13.4058L2.27318 13.4042L13.4667 2.93498L14.8666 1.62619C17.1849 -0.542064 20.9429 -0.542064 23.2612 1.62619C25.5796 3.79445 25.5796 7.30965 23.2612 9.47874L10.9223 20.8993L10.918 20.8961C9.39739 22.2673 6.97377 22.2576 5.4713 20.8595C3.96883 19.4605 3.95936 17.2054 5.43246 15.7918L5.42813 15.7869L6.80207 14.5098L13.6719 8.1188L15.045 9.39751L6.80207 17.0656C6.04305 17.7708 6.04305 18.9154 6.80207 19.6213C7.56109 20.3273 8.79183 20.3273 9.54996 19.6213L21.8621 8.16828L21.8586 8.16586L21.9052 8.12845C23.4509 6.6832 23.4509 4.33865 21.9052 2.89348C20.3596 1.44832 17.8549 1.44823 16.3093 2.89348L16.2679 2.93739L16.2653 2.93572L14.8664 4.24368L3.67216 14.713C1.3538 16.8812 1.3538 20.3964 3.67216 22.5647C5.99052 24.7329 9.74935 24.7329 12.0659 22.5647L21.8605 13.4042L23.2595 12.0962L24.6584 13.4042L23.2595 14.713L13.4667 23.8735C13.4667 23.8734 13.4649 23.8718 13.4649 23.8718Z" fill="#A09BB1" />
                            </svg>
                        </label>
                        <input
                            className='chat__form-field-file'
                            onChange={(e) => setImage(e.target.files)}
                            type="file"
                            accept='image/*'
                            multiple
                            id='photo'
                            style={{ display: 'none' }}
                        />
                    </div>
                }
                <Input
                    placeholder='Введите сообщение...'
                    value={value}
                    setValue={setValue}
                    className='chat__form-field'
                />
                {loading &&
                    <Loader />
                }
                {selectedMessage &&
                    <div className='chat__form-buttons'>
                        <button onClick={closeEdit} className='chat__form-button'>
                            <svg width="22" height="22" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2386 12.5L24.3459 5.39276C25.218 4.5206 25.218 3.10653 24.3459 2.23366L22.7663 0.654119C21.8942 -0.21804 20.4801 -0.21804 19.6072 0.654119L12.5 7.76136L5.39276 0.654119C4.5206 -0.21804 3.10653 -0.21804 2.23366 0.654119L0.654119 2.23366C-0.21804 3.10582 -0.21804 4.51989 0.654119 5.39276L7.76136 12.5L0.654119 19.6072C-0.21804 20.4794 -0.21804 21.8935 0.654119 22.7663L2.23366 24.3459C3.10582 25.218 4.5206 25.218 5.39276 24.3459L12.5 17.2386L19.6072 24.3459C20.4794 25.218 21.8942 25.218 22.7663 24.3459L24.3459 22.7663C25.218 21.8942 25.218 20.4801 24.3459 19.6072L17.2386 12.5Z" fill="white" />
                            </svg>
                        </button>
                        <button onClick={saveChange} className='chat__form-button'>
                            <svg width="25" height="25" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.49111 17.6465L0.366101 9.80163C-0.122034 9.33032 -0.122034 8.56616 0.366101 8.0948L2.13383 6.38798C2.62196 5.91663 3.41347 5.91663 3.9016 6.38798L9.375 11.6726L21.0984 0.353478C21.5865 -0.117826 22.378 -0.117826 22.8662 0.353478L24.6339 2.0603C25.122 2.5316 25.122 3.29577 24.6339 3.76712L10.2589 17.6465C9.7707 18.1178 8.97924 18.1178 8.49111 17.6465V17.6465Z" fill="white" />
                            </svg>
                        </button>
                        <button onClick={removeMessage} className='chat__form-button'>
                            <svg width="25" height="25" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.9554 22.75H16.2946C16.4722 22.75 16.6426 22.6809 16.7682 22.5578C16.8937 22.4347 16.9643 22.2678 16.9643 22.0938V10.2812C16.9643 10.1072 16.8937 9.94028 16.7682 9.81721C16.6426 9.69414 16.4722 9.625 16.2946 9.625H14.9554C14.7778 9.625 14.6074 9.69414 14.4818 9.81721C14.3563 9.94028 14.2857 10.1072 14.2857 10.2812V22.0938C14.2857 22.2678 14.3563 22.4347 14.4818 22.5578C14.6074 22.6809 14.7778 22.75 14.9554 22.75ZM24.1071 4.375H19.5084L17.611 1.27422C17.3729 0.885399 17.0361 0.563659 16.6334 0.340351C16.2307 0.117043 15.7758 -0.000215654 15.3131 2.97744e-07H9.68694C9.22441 -2.67296e-05 8.76975 0.117322 8.36724 0.340621C7.96473 0.56392 7.62808 0.885558 7.39007 1.27422L5.49163 4.375H0.892857C0.656057 4.375 0.428955 4.46719 0.261512 4.63128C0.0940686 4.79538 0 5.01794 0 5.25L0 6.125C0 6.35706 0.0940686 6.57962 0.261512 6.74372C0.428955 6.90781 0.656057 7 0.892857 7H1.78571V25.375C1.78571 26.0712 2.06792 26.7389 2.57025 27.2312C3.07258 27.7234 3.75388 28 4.46429 28H20.5357C21.2461 28 21.9274 27.7234 22.4298 27.2312C22.9321 26.7389 23.2143 26.0712 23.2143 25.375V7H24.1071C24.3439 7 24.571 6.90781 24.7385 6.74372C24.9059 6.57962 25 6.35706 25 6.125V5.25C25 5.01794 24.9059 4.79538 24.7385 4.63128C24.571 4.46719 24.3439 4.375 24.1071 4.375ZM9.58929 2.78414C9.61913 2.73546 9.66135 2.69521 9.71182 2.66732C9.76229 2.63942 9.81929 2.62484 9.87723 2.625H15.1228C15.1806 2.62494 15.2375 2.63956 15.2879 2.66745C15.3382 2.69534 15.3804 2.73554 15.4102 2.78414L16.3845 4.375H8.61551L9.58929 2.78414ZM20.5357 25.375H4.46429V7H20.5357V25.375ZM8.70536 22.75H10.0446C10.2222 22.75 10.3926 22.6809 10.5182 22.5578C10.6437 22.4347 10.7143 22.2678 10.7143 22.0938V10.2812C10.7143 10.1072 10.6437 9.94028 10.5182 9.81721C10.3926 9.69414 10.2222 9.625 10.0446 9.625H8.70536C8.52776 9.625 8.35743 9.69414 8.23185 9.81721C8.10627 9.94028 8.03571 10.1072 8.03571 10.2812V22.0938C8.03571 22.2678 8.10627 22.4347 8.23185 22.5578C8.35743 22.6809 8.52776 22.75 8.70536 22.75Z" fill="#E53935" />
                            </svg>
                        </button>
                    </div>
                }
                {selectedMessage.length === 0 && loading === false &&
                    <button className='chat__form-icon chat__form-send'>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.530248 0.396765C0.760104 0.191123 1.0444 0.058502 1.34785 0.0153579C1.65131 -0.0277863 1.96057 0.0204457 2.23726 0.154069L24.2553 10.8038C24.4781 10.9113 24.6664 11.0808 24.7982 11.2925C24.93 11.5042 25 11.7495 25 11.9999C25 12.2504 24.93 12.4957 24.7982 12.7074C24.6664 12.9191 24.4781 13.0886 24.2553 13.1961L2.23726 23.8458C1.97955 23.9703 1.69319 24.0209 1.40918 23.9921C1.12517 23.9634 0.854322 23.8563 0.625969 23.6825C0.397615 23.5087 0.22045 23.2748 0.113655 23.0062C0.00685854 22.7376 -0.0255001 22.4444 0.0200815 22.1585L1.64282 11.9999L0.0200815 1.84138C-0.0220934 1.57646 0.00257878 1.305 0.0917939 1.05238C0.181009 0.79975 0.331857 0.574191 0.530248 0.396765V0.396765ZM3.23481 12.8667L1.74987 22.1608L22.7567 11.9999L1.74987 1.83907L3.23481 11.1332H11.6184C11.8449 11.1332 12.0622 11.2245 12.2223 11.387C12.3825 11.5496 12.4725 11.7701 12.4725 11.9999C12.4725 12.2298 12.3825 12.4503 12.2223 12.6128C12.0622 12.7754 11.8449 12.8667 11.6184 12.8667H3.23481Z" fill="#A09BB1" />
                        </svg>
                    </button>
                }
            </div>
        </form >
    );
};

