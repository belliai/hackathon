import { belliApi } from "@/lib/utils/network";
import { useQuery } from "@tanstack/react-query";

const route = "enums";

interface FetchEnumsParams {
  category: EnumsCategory
}

export const fetchEnums = async (params: FetchEnumsParams) => {
  return belliApi
    .get(route, {
      params,
    })
    .then((res) => res.data as Enums[]);
};

export const useEnums = (params: FetchEnumsParams) => {
  const enumsRes = useQuery({
    queryKey: [route, params.category],
    queryFn: async () => await fetchEnums(params),
  });

  return enumsRes;
};
