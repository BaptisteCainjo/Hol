import axios from "../net";
import { useEffect, useState } from "react";

const useSession = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("http://localhost:5000/api/users/login");
                setUser(data);
                setError(null);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return { user, loading, error };
};

export default useSession;