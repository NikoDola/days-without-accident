"use client"
import { listAllEmployees } from "@/firebase/actions"
import { useEffect, useState } from "react"
import Notification from "@/components/Notification"

export default function EmployeeSearch() {


    return (
        <>
            <form>
                <Notification />
            </form>
        </>
    );
}
