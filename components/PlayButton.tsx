import React from "react"

import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(`/watch/${movieId}`)}
            className="flex flex-row items-center w-auto px-2 py-1 text-sm font-semibold transition bg-white rounded-md cursor-pointer md:py-2 md:px-4 lg:text-lg hover:bg-neutral-300">
            <BsFillPlayFill size={25} className="mr-1" /> Play
        </button>
    );
}

export default PlayButton;