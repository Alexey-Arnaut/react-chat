import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

export const firebaseStorageAudio = async (item: any) => {
    const imgRef = ref(
        storage,
        `audio/${new Date().getTime()} - ${item.name}`
    );

    const snap = await uploadBytes(imgRef, item)
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

    return url
}

export const firebaseStorageImage = async (image: any) => {
    const url: string[] = []

    for (let i = 0; i < image.length; i++) {
        const imgRef = ref(
            storage,
            `image/${new Date().getTime()} - ${image[i].name}`
        );

        const snap = await uploadBytes(imgRef, image[i])
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url.push(dlUrl)
    }

    return url
}