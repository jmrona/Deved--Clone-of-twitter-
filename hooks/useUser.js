import { onAuthStateChanged } from "firebase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
};

export default function useUser() {
    const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(setUser);
        // onAuthStateChanged((user) => setUser(user)); Lo mismo que lo anterior
    }, []);

    useEffect(() => {
        user === USER_STATES.NOT_LOGGED && router.push("/");
    }, [user]);

    return user;
}
