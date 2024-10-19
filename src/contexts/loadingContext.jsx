'use client'

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const UsrContext = createContext();

export function Wrapper({ children }) {
    const [loading, setLoading] = useState(nul)
}