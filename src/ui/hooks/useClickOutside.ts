import * as React from 'react';

export default function useClickOutside(
    ref: React.RefObject<HTMLElement | null | undefined>,
    callback: (event: MouseEvent | TouchEvent) => void,
    eventType: 'click' | 'default' = 'default',
) {
    const callbackRef = React.useRef(callback);

    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    React.useEffect(() => {
        const handler = (event: MouseEvent | TouchEvent) => {
            const element = ref.current;

            if (element && !element.contains(event.target as Node)) {
                callbackRef.current(event);
            }
        };

        if (eventType === 'click') {
            document.addEventListener('click', handler);

            return () => {
                document.removeEventListener('click', handler);
            };
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventType]);
}
