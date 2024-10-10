"use client";
import "./css-components/Notification.css";
import { listAllAccidents } from "@/firebase/actions";
import { useEffect, useState, useRef } from "react";
import { AccidentType } from "@/firebase/types";
import Link from "next/link";

export default function Notification() {
    const [unsolvedAccidents, setUnsolvedAccidents] = useState<AccidentType[]>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const notificationRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function fetchAccidents() {
            const accidents: any = await listAllAccidents();
            const unsolved: AccidentType[] = accidents.filter((item: any) => item.status === "unsolved");
            setUnsolvedAccidents(unsolved);
        }

        fetchAccidents();
    }, []);

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div onClick={handleToggle} className={unsolvedAccidents.length > 0 ? 'notificationCounter' : 'notification'}>
                {unsolvedAccidents.length > 0 && <p className="notificationNumber">{unsolvedAccidents.length}</p>}
            </div>
            {toggle && ( // Only render the notification list when toggle is true
                <div className="notificationListWrapper" ref={notificationRef}>
                    {unsolvedAccidents.length > 0 && (
                        unsolvedAccidents.map((item: AccidentType) => (
                            <div key={item.id}>
                                <p>{item.title}</p>
                                <p>{item.id}</p>
                                <Link href={`/admin/departments/${item.departmentID}/accidents/${item.id}`}>
                                    View
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
