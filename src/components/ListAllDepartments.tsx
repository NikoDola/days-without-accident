"use client";
import { useEffect, useState } from "react";
import { listAllDepartments } from "@/firebase/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        setSearch(e.target.value); // Capture the search input
    };

    return (
        <div className="sectionListing flex-col">
            <div className="flex items-center gap-4">
                <h6 className="altHeadline">Department Listing</h6>
                <hr className="line" />
            </div>
            <div className="searchFilterWrapper">
                <input onChange={handleSearch} type="search" placeholder="Search department" className="searchBar" value={search} />
                <div className="sortingOptions flex gap-4">
                    <p>Filter by</p>
                    <div className="flex gap-2">
                        <p>Alphabet:</p>
                        <p>A-Z</p>
                    </div>
                    <div className="flex gap-2">
                        <p>Employee size:</p>
                        <p>{'<>'}</p>
                    </div>
                    <div className="flex gap-2">
                        <p>Accidents sw</p>
                        <p>{'<>'}</p>
                    </div>
                </div>
            </div>
            {!loading && !error ? (
                <div className="cardWrapper">
                    {filteredDepartments.map(department => (
                        <div className="departmentCardWrapper" key={department.id}>
                            <div className="h-full">
                                {toggle === department.id ? (
                                    <p onClick={() => handleToggle(department.id)} className="departmentCardToggleInactive">x</p>
                                ) : (
                                    <p onClick={() => handleToggle(department.id)} className="departmentCardToggleActive">&#8942;</p>
                                )}
                                {toggle === department.id && (
                                    <ul className="navBarDepartmentCard">
                                        <li><Link href={`/admin/departments/${department.id}`}>Edit Department</Link></li>
                                        <hr className="text-white" />
                                        <li><Link href={`/admin/departments/${department.id}/employees`}>Add & list employees</Link></li>
                                        <hr className="text-white" />
                                        <li><Link href={`/admin/departments/${department.id}/accidents`}>Add & list Accidents</Link></li>
                                    </ul>
                                )}
                                <h3 className="font-semibold">{department.shortName}</h3>
                                <p className="font-semibold">{department.fullName}</p>
                                <p>Accidents <b>{department.accidents}</b></p>
                                <p className="mb-4">Employees <b>{department.employees}</b></p>
                            </div>
                            <button className="altButton" onClick={() => router.push(`departments/${department.id}/accidents`)}>Report Accident</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>{loading ? "Loading..." : error}</p>
            )}
        </div>
    );
}
