import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "payment-modes"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchPaymentNodes = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updatePaymentNode = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addPaymentNode = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removePaymentNode = async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const usePaymentNodes = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchPaymentNodes
        });
};

export const useUpdatePaymentNode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updatePaymentNode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddPaymentNode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addPaymentNode,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemovePaymentNode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removePaymentNode,
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