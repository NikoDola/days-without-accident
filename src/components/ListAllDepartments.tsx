"use client";
import { useEffect, useState } from "react";
import { listAllDepartments } from "@/firebase/actions";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";

export default function ListDepartments() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [toggle, setToggle] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchDataDepartments = async () => {
            try {
                const depData = await listAllDepartments();
                if (Array.isArray(depData)) {
                    setDepartments(depData);
                    setFilteredDepartments(depData); // Initialize filtered list
                } else {
                    throw new Error("Fetched data is not an array");
                }
            } catch (error: any) {
                console.error("Error fetching departments:", error);
                setError(error.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchDataDepartments();
    }, []);

    // Filter the departments when search input changes
    useEffect(() => {
        if (search) {
            const lowercasedSearch = search.toLowerCase();
            const filtered = departments.filter(department =>
                department.shortName.toLowerCase().includes(lowercasedSearch) ||
                department.fullName.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredDepartments(filtered);
        } else {
            setFilteredDepartments(departments); // Reset to full list if search is cleared
        }
    }, [search, departments]);

    const handleToggle = (id: string) => {
        setToggle(prevID => (prevID === id ? null : id));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value); 
    };

    return (
        <div className="sectionListing flex-col w-full">
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Department Listing</h6>
                <hr className="line" />
            </div>
            <div className="searchFilterWrapper relative">
                <input onChange={handleSearch} type="search" placeholder="Search department" className="searchBar" value={search} />
                <img className="searchIcon" src="/general/search.svg"/>
            </div>
            
            {!loading && !error ? (
                <div className="cardWrapper">
                    {filteredDepartments.map(department => (
                        <div className="itemCardWrapper" key={department.id}>
                            <div className="h-full">
                                {toggle === department.id ? (
                                    <p onClick={() => handleToggle(department.id)} className="itemCardToggleInactive">x</p>
                                ) : (
                                    <p onClick={() => handleToggle(department.id)} className="itemCardToggleActive">&#8942;</p>
                                )}
                                {toggle === department.id && (
                                <ul className="navBarItemCard">
                                    <Link href={`/admin/departments/${department.id}`}>
                                        <div className="linkWrapper">
                                            <li className="navLinks">Edit Department</li>
                                            <img src="/general/edit.svg"/>
                                        </div>
                                    </Link>
                        
                                    <hr className="hrDecoration" />
                        
                                    <Link href={`/admin/departments/${department.id}/employees`}>
                                        <div className="linkWrapper">
                                            <li className="navLinks">View Employees</li>
                                            <img src="/general/employees.svg"/>
                                        </div>
                                    </Link>
                        
                                    <hr className="hrDecoration" />
                        
                                    <Link href={`/admin/departments/${department.id}/accidents`}>
                                        <div className="linkWrapper">
                                            <li className="navLinks">View Accidents</li>
                                            <img src="/general/accident.svg"/>
                                        </div>
                                    </Link>
                    
                                </ul>
                                )}
                                <h3 className="shortName">{department.shortName}</h3>
                                <p className="mb-4">{department.fullName}</p>
                                <hr className="hrDecorationzx"/>
                                <div className="mt-4 mb-4">
                                    <Link href={`/admin/departments/${department.id}/accidents`}>
                                        <p className="cardLinks text-gray-200">Accidents <b>{department.accidents}</b></p>
                                    </Link>
                                    <Link href={`/admin/departments/${department.id}/employees`}>
                                        <p className="cardLinks  text-gray-200">Employees <b>{department.employees}</b></p>
                                    </Link>                              
                                </div> 
                            </div>
                            <button className="reportButton" onClick={() => router.push(`departments/${department.id}/accidents`)}>Report Accident</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>{loading ? "Loading..." : error}</p>
            )}
        </div>
    );
}
