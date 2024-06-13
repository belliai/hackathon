import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "statuses"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchStatuses = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateStatus = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addStatus = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeStatus = async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const useStatuses = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchStatuses
        });
};

export const useUpdateStatus = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updateStatus,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddStatus = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addStatus,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemoveStatus = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeStatus,
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