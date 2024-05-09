import {useCallback, useEffect, useState} from 'react';
import {CalendarDays, Clock} from "lucide-react";

function Time() {
    const [tanggal, setTanggal] = useState(() =>
        new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    );
    const [waktu, setWaktu] = useState(
        () =>
            new Date()
                .toLocaleDateString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: 'h24',
                })
                .split(', ')[1]
    );

    const update = useCallback(() => {
        setTanggal(
            new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        );
        setWaktu(
            new Date()
                .toLocaleDateString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hourCycle: 'h24',
                })
                .split(', ')[1]
        );
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        function tick() {
            update();
            animationFrameId = requestAnimationFrame(tick);
        }

        animationFrameId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationFrameId);
    }, [update]);

    return (
        <div className="hidden md:flex items-center gap-1">
            <CalendarDays/> {tanggal} - <Clock/>
            <span className="tracking-widest">{waktu}</span>
        </div>
    );
}

export default Time;