"use client";

import {Toast} from "@base-ui/react/toast";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function CatchAll() {
    const router = useRouter();
    const {add} = Toast.useToastManager();

    useEffect(() => {
        add({title: "Route not found", description: "Redirecting you home."});
        router.replace("/");
    }, [add, router]);

    return null;
}
