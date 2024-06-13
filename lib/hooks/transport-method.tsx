import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "transport-methods"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchTransportMethods= async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateTransportMethod = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addTransportMethod = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeTransportMethod= async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const useTransportMethods = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchTransportMethods
        });
};

export const useUpdateTransportMethod = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updateTransportMethod,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddTransportMethod = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addTransportMethod,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemoveTransportMethod = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeTransportMethod,
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