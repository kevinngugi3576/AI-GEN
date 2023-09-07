"use client";

import { useEffect } from "react";
import  { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f822240d-ffd7-4026-beaa-1940a4ddf475");
    }, []);
    return null;
};