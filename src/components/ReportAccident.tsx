"use client"
// ReportAccident.tsx
import { useEffect, useState } from 'react';
import { addAccident, getCounter } from "@/firebase/actions";
import Counter from './Counter';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function ReportAccident({ id }) {
    return(
        <Counter/>
    )

            

}