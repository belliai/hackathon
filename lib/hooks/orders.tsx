import axios from 'axios';
import {  setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Order } from '@/schemas/order/order';
import { error } from 'console';

const route = "orders"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchOrders = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateOrder = async (prop: Order & { id: string }) => {
    const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order);

    const updateData = filteredOrder

        const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
        return data;

};

export const addOrder = async (prop: Order) => {

    const filteredOrder = Object.entries(prop)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Order);

    const newData = filteredOrder;
    delete prop.ID
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeOrder = async (prop: { id: string }) => {
    const resp = await axios.delete(`/${route}/${prop.id}`, config);
    return resp
};

export const useOrders = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchOrders
        });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:  updateOrder,
           
            onError : (error) =>{
                throw Error("Error")
            },
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
        }
    );
    return mutation;
};

export const useAddOrder = () => {
    const queryClient = useQueryClient();
    const mutation : any = useMutation(
        {
            mutationFn: addOrder,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
        }
    );
    return mutation;
};

export const useRemoveOrder = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeOrder,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({ queryKey: [route] });
            },
        }
    );
    return mutation;
};