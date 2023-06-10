import { useState } from "react";
import axios from "axios";
import { API } from "../utils/const.ts";
import { getAuthData } from "../utils/authStorage.ts";

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async (url: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/auth/${url}`, data);
      setData(response.data);
      setError(null);
    } catch (axiosError: any) {
      setData(null);
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      const message = axiosError.response?.data.message;
      setError({ status, data, message });
    }
    setIsLoading(false);
  };

  const mutate = async (url: string, data: any) => {
    fetchData(url, data);
  };

  return { isLoading, data, error, mutate };
};

export const useGetApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const authData = getAuthData();
  const fetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/${url}`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setData(response.data);
      setError(null);
    } catch (axiosError: any) {
      setData(null);
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      const message = axiosError.response?.data.message;
      setError({ status, data, message });
    } finally {
      setIsLoading(false);
    }
  };
  const get = async (url: string) => {
    fetchData(url);
  };

  return { isLoading, data, error, get };
};
/*
export const useProtectedPostApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);

  const fetchData = async (url, data) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axios.post(`${API}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setError(null);
    } catch (axiosError) {
      setData(null);
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      const message = axiosError.response?.data.message;
      setError({ status, data, message });
    }
    setIsLoading(false);
  };
  const mutate = async (url, data) => {
    fetchData(url, data);
  };
  return { isLoading, data, error, mutate };
};*/

export const useProtectedPatchApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const authData = getAuthData();
  const fetchData = async (url: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${API}/${url}`, data, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setData(response.data);
      setError(null);
    } catch (axiosError: any) {
      setData(null);
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      const message = axiosError.response?.data.message;
      setError({ status, data, message });
    }
    setIsLoading(false);
  };

  const mutate = async (url: string, data: any) => {
    fetchData(url, data);
  };

  return { isLoading, data, error, mutate };
};

export const useProtectedDeleteApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const authData = getAuthData();
  const fetchData = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${API}/${url}`, {
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setData(response.data);
      setError(null);
    } catch (axiosError: any) {
      setData(null);
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      const message = axiosError.response?.data.message;
      setError({ status, data, message });
    }
    setIsLoading(false);
  };

  const mutate = async (url: string) => {
    fetchData(url);
  };

  return { isLoading, data, error, mutate };
};
