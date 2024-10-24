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
    const bellIconRef = useRef<HTMLDivElement | null>(null); // Ref for the bell icon

    useEffect(() => {
        async function fetchAccidents() {
            const accidents: any = await listAllAccidents();
            const unsolved: AccidentType[] = accidents.filter((item: any) => item.status === "Unsolved");
            setUnsolvedAccidents(unsolved);
        }

        fetchAccidents();
    }, []);

    const handleToggle = () => {
        console.log('Toggle clicked'); // Debugging log
        setToggle((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close the notification if clicked outside, but not when clicking the bell icon
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                bellIconRef.current &&
                !bellIconRef.current.contains(event.target as Node)
            ) {
                setToggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
    async function fetchAccidents() {
        const accidents: any = await listAllAccidents();
        const unsolved: AccidentType[] = accidents.filter((item: any) => item.status === "Unsolved");
        setUnsolvedAccidents(unsolved);
        console.log("Unsolved Accidents:", unsolved); // Add this to check if unsolved accidents exist
    }

    fetchAccidents();
}, []);

    return (
        <div>
            {/* Ref added to the bell icon */}
            <div onClick={handleToggle} ref={bellIconRef} className={unsolvedAccidents.length > 0 ? 'notificationCounter' : 'notification'}>
                {unsolvedAccidents.length > 0 && <p className="notificationNumber">{unsolvedAccidents.length}</p>}
            </div>

            <div>
            {toggle && ( // Only render the notification list when toggle is true
                <div className="notificationListWrapper" ref={notificationRef}>
                    <div className=" p-4 ">
                        <p className="text-right">Notifications</p>
                    </div>
              
                    {unsolvedAccidents.length > 0 ? (
                        unsolvedAccidents.map((item: AccidentType) => (
                            <div className="actionWrapper" key={item.id}>
                                  <Link href={`/admin/departments/${item.departmentID}/accidents/${item.id}`}>
                                <div className="singleNotification">
                                    <p>{item.title}</p>
                                    <p className="text-red-600">Accident {item.status}</p>
                                    <div>
                                    <p>{item.dataReported}</p>
                                    </div>
                                   
                                </div>
                                </Link>
                            </div>
                        ))
                    ):
                    <div className="p-4">
                        <hr className="border-black p-2 text-right"  />
                        <p >Notifications are empty</p>
                        
                    </div>}
                  
                </div>
            )}
            </div>
        </div>
    );
}
