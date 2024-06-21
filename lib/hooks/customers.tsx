import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Customer } from '@/schemas/customer';

const route = "customers"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchCustomers = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateCustomer = async (prop: Customer & { id: string }) => {
    const filteredCustomer = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Customer);

    const updateData = filteredCustomer
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addCustomer = async (prop: Customer) => {

    const filteredCustomer = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Customer);

    const newData = filteredCustomer;
    delete prop.ID
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeCustomer = async (prop: { id: string }) => {
    const resp = await axios.delete(`/${route}/${prop.id}`, config);
    return resp

};

export const useCustomers = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchCustomers
        });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: updateCustomer,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
        }
    );
    return mutation;
};

export const useAddCustomer = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addCustomer,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
        }
    );
    return mutation;
};

export const useRemoveCustomer = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeCustomer,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
            onError: (e) => {
                console.log(e)
            }
        }
    );
    return mutation;
};