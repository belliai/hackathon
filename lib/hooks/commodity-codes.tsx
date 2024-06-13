import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "commodity-codes"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchCommodityCodes = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateCommodityCode = async (prop : { id: string, name: string,  description: string}) => {
    const updateData = { name : prop.name, description : prop.description };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addCommodityCode = async (prop : {  name: string, description: string}) => {
    const newData = { name : prop.name, description: prop.description };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeCommodityCode = async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const useCommodityCodes = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchCommodityCodes
        });
};

export const useUpdateCommodityCode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updateCommodityCode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddCommodityCode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addCommodityCode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemoveCommodityCode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeCommodityCode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
            onError:(e) => {
                console.log(e)
            }
        }
    );
    return mutation;
};