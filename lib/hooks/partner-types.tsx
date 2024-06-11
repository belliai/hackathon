import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "partner-types"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchPartnerTypes = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updatePartnerType = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addPartnerType = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removePartnerType= async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const usePartnerTypes = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchPartnerTypes
        });
};

export const useUpdatePartnerType = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updatePartnerType,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddPartnerType = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addPartnerType,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemovePartnerType = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removePartnerType,
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