import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

const getMql = (): MediaQueryList | undefined => {
    if (typeof window === 'undefined') {
        return undefined;
    }

    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
};

function mediaQueryListener(callback: () => void): () => void {
    const mql = getMql();
    if (!mql) {
        return () => {};
    }

    const handler = (): void => callback();
    mql.addEventListener('change', handler);

    return (): void => {
        mql.removeEventListener('change', handler);
    };
}

function isSmallerThanBreakpoint(): boolean {
    return getMql()?.matches ?? false;
}

function getServerSnapshot(): boolean {
    return false;
}

export function useIsMobile(): boolean {
    return useSyncExternalStore(
        mediaQueryListener,
        isSmallerThanBreakpoint,
        getServerSnapshot,
    );
}

