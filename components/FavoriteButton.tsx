import axios from "axios";
import React from "react";
import { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;
        if (isFavorite) response = await axios.delete(`/api/favorite/${movieId}`);
        else response = await axios.post(`/api/favorite/${movieId}`, { movieId });

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        })

        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavorites}
            className="flex items-center justify-center w-6 h-6 text-white transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-neutral-300">
            <Icon size={25} />
        </div>
    );
}

export default FavoriteButton;