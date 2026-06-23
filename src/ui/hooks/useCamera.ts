'use client';

import {
    type RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

type UseCameraReturn = {
    videoRef: RefObject<HTMLVideoElement | null>;
    isOpen: boolean;
    errorMessage: string | null;
    handleOpen: () => void;
    handleClose: () => void;
};

const useCamera = (openErrorLabel: string): UseCameraReturn => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const stopStream = useCallback(() => {
        const stream = streamRef.current;
        streamRef.current = null;

        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }

        setActiveStream(null);
    }, []);

    const handleClose = useCallback(() => {
        stopStream();
        setIsOpen(false);
        setErrorMessage(null);
    }, [stopStream]);

    const handleOpen = useCallback(() => {
        stopStream();
        setErrorMessage(null);

        try {
            void navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: { facingMode: { ideal: 'environment' } },
                })
                .then(stream => {
                    streamRef.current = stream;
                    setActiveStream(stream);
                    setIsOpen(true);
                })
                .catch(() => {
                    setErrorMessage(openErrorLabel);
                    setIsOpen(true);
                });
        } catch {
            setErrorMessage(openErrorLabel);
            setIsOpen(true);
        }
    }, [openErrorLabel, stopStream]);

    useEffect(() => {
        if (!isOpen || !activeStream) return () => {};

        const videoElement = videoRef.current;

        if (!videoElement) return () => {};

        videoElement.srcObject = activeStream;
        void videoElement.play().catch(() => {});

        return () => {
            videoElement.srcObject = null;
        };
    }, [activeStream, isOpen]);

    return { videoRef, isOpen, errorMessage, handleOpen, handleClose };
};

export default useCamera;
