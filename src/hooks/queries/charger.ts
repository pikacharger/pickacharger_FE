import chargerApi from "@/apis/charger";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";



const useChargerList = (location: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["getChargerList", location],
        queryFn: () => {
            return chargerApi.getChargerList(location);
        },
        enabled: !!location,
    });
    return { data, ...rest };
};

const useChargerDetail = (id: number) => {
    const { data, ...rest } = useQuery({
        queryKey: ["getChargerDetail", id],
        queryFn: () => {
            return chargerApi.getChargerDetail(id);
        },
    });
    return { data, ...rest };
};

const useFavoritesCharger = (filter: boolean) => {
    const { data, ...rest } = useQuery({
        queryKey: ["useFavoritesCharger"],
        queryFn: () => {
            return chargerApi.getFavoritesCharger();
        },
        enabled: filter,
    });
    return { data, ...rest };
};

const useCreateFavorite = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (chargerId: number) => chargerApi.createFavorite(chargerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getChargerDetail"] });
        },
        onError: (error: AxiosError<string>) => {
            console.log(error);
        },
    });
    return {
        createFavorite: mutate,
    };
};

const useDeleteFavorite = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (chargerId: number) => chargerApi.deleteFavorite(chargerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getChargerDetail"] });
        },
        onError: (error: AxiosError<string>) => {
            console.log(error);
        },
    });
    return {
        deleteFavorite: mutate,
    };
};

export {
    useChargerList,
    useChargerDetail,
    useFavoritesCharger,
    useCreateFavorite,
    useDeleteFavorite,
};
