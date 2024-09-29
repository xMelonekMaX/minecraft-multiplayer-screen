import { useEffect, useRef } from "react";

export const useWithSound = (audioSource: string) => {
	const soundRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		soundRef.current = new Audio(audioSource);
		soundRef.current.volume = 0.32;
	}, []);

	function playSound() {
		if (soundRef.current) soundRef.current.currentTime = 0;
		soundRef.current?.play();
	}

	function pauseSound() {
		soundRef.current?.pause();
	}

	return {
		playSound,
		pauseSound,
	};
};
