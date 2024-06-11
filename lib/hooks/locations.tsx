import axios from 'axios';
import { setHeaders } from '../utils/network';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const route = "locations"

const config = {
    headers: setHeaders(),
    baseURL: process.env.NEXT_PUBLIC_API_URL
};

export const fetchLocations = async () => {
    const { data } = await axios.get(`/${route}`, config);
    return data;
};

export const updateLocation = async (prop : { id: string, name: string}) => {
    const updateData = { name : prop.name };
    const { data } = await axios.put(`/${route}/${prop.id}`, updateData, config);
    return data;
};

export const addLocation = async (prop : {  name: string}) => {
    const newData = { name : prop.name };
    const { data } = await axios.post(`/${route}`, newData, config);
    return data;
};

export const removeLocation = async (prop : {  id: string}) => {
    const resp = await axios.delete(`/${route}/${prop.id}`,  config);
    return resp

};

export const useLocations = () => {
    return useQuery(
        {
            queryKey: [route],
            queryFn: fetchLocations
        });
};

export const useUpdateLocation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn:   updateLocation,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useAddLocation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: addLocation,
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries({queryKey:[route]});
            },
        }
    );
    return mutation;
};

export const useRemoveLocation = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        {
            mutationFn: removeLocation,
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