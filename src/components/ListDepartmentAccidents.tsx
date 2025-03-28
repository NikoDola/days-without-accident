"use client";

import { useEffect, useState } from "react";
import { listDepartmentAccidents } from "@/firebase/actions";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "next/navigation";
import "./ListDepartmentAccidents.css"

interface AccidentType {
    id: string;
    title: string;
    time: number;  // this will be in seconds
    involvedEmployees: any[]; 
    status: string;
}

interface ListAllAccidentsProps {
    departmentID: string; 
}

export default function ListAllAccidents({ departmentID }: ListAllAccidentsProps) {
    const [allAccidents, setAllAccidents] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredAccidents, setFilteredAccidents] = useState<AccidentType[]>([]);
    const [toggle, setToggle] = useState<string | null>(null);
    const router = useRouter()
    const handleToggle = (id: string) => {
        setToggle(prevID => (prevID === id ? null : id));
    };
    const startDate: Date = new Date("2022-05-10"); // Set your start date here

    useEffect(() => {
        async function fetchData() {
            try {
                const accidents: any = await listDepartmentAccidents(departmentID);
                setAllAccidents(accidents);

                const docRef = doc(db, 'users', "Nik's", 'departments', departmentID);
                await updateDoc(docRef, {
                    accidents: accidents.length
                });
                setFilteredAccidents(accidents); // Set filtered accidents after fetching
            } catch (error) {
                console.error("Error fetching accidents: ", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [departmentID]);

    useEffect(() => {
        if (search) {
            const lowercasedSearch = search.toLowerCase();
            const filtered = allAccidents.filter(accident => 
                accident.title.toLowerCase().includes(lowercasedSearch) ||
                accident.involvedEmployees.some(employee =>
                    employee.name.toLowerCase().includes(lowercasedSearch) || 
                    employee.lastName.toLowerCase().includes(lowercasedSearch) // Include last name in the search
                )
            );
            setFilteredAccidents(filtered);
        } else {
            setFilteredAccidents(allAccidents); // Reset to full list if search is cleared
        }
    }, [search, allAccidents]); // Include allAccidents in the dependency array

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    // Converting Time from seconds to date
    function convertSecondsToDate(seconds: number) {
        const milliseconds = seconds * 1000; 
        const accidentDate = new Date(startDate.getTime() + milliseconds); 
        return accidentDate.toLocaleDateString(); 
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        
        <div className="sectionListing flex-col w-full">
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Accident Listing</h6>
                <hr className="line" />
            </div>

            <div className="searchFilterWrapper relative">
                <img className="searchIcon" src="/general/search.svg" alt="Search Icon" />
                <input onChange={handleSearch} type="search" placeholder="Search Accident" className="searchBar" value={search} />

            </div>

            <div className="cardWrapper">
                {filteredAccidents.length > 0 ? (
                    filteredAccidents.map(item => (
                            <div className="itemCardWrapper" key={item.id}>
                                <div className="h-full">
                                    {item.title.length < 20 ? <h5>{item.title}</h5>
                                    :<h5>{item.title.substring(0, 20) + '...'}</h5>}
                                    <hr className="mt-4"/>
                                </div>
                                <p className="mt-4"> {item.involvedEmployees.length} {item.involvedEmployees.length === 1 ? "employee" : "employees"} in the accident </p>
                                <div className="border border-gray-600  mt-4 mb-4"/>
                                <p style={{ color: item.status === 'Unsolved' ? 'red' : 'green' }}>Status {item.status}</p>
                                <div className="border border-gray-600  mt-4 mb-4"/>
                                <p className="mb-4 text-gray-300">Date: {convertSecondsToDate(item.time)}</p>
                                <button className="cardButton" onClick={()=> router.push(`/admin/departments/${departmentID}/accidents/${item.id}`)}>View Accident</button>
                            </div>
                           
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
           
        </div>
    );
}
