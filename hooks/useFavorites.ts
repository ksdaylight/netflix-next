import fetcher from "@/pages/api/fetcher";
import useSWR from "swr";

const useFavorites = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateIfStale: false
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useFavorites;