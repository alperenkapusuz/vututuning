// GELEN GUNCELLEMELER İLE DEGİSİKLİK GÖSTEREBİLİR
import { API_URL } from "@/config/env";
import { getClientToken } from "@/lib/client-action-token";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  "Content-Type": "application/json",
  "Accept-Language": "tr",
};

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  try {
    const token = getClientToken();
    if (token != undefined && token != null) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: API_URL,
      headers,
      timeout: 1000 * 20,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  REQUEST<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  GET<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  POST<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  PUT<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  DELETE<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: AxiosError) {
    switch (error.status) {
      case StatusCode.InternalServerError: {
        toast.error("500 Internal Server Error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      }
      case StatusCode.Forbidden: {
        toast.error("403 Forbidden", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      }
      case StatusCode.Unauthorized: {
        toast.error("401 Unauthorized", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      }
      case StatusCode.TooManyRequests: {
        toast.error("429 Too Many Requests", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();
