import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "payment-modes"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchPaymentModes = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updatePaymentMode = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addPaymentMode = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removePaymentMode = async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const usePaymentModes = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchPaymentModes
        });
};

export const useUpdatePaymentMode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updatePaymentMode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddPaymentMode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addPaymentMode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemovePaymentMode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removePaymentMode,
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