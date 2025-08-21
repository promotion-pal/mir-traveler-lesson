import { envConfig } from "@/shared/config/env";
import { getToken } from "../data/token";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type QueryParams = Record<string, unknown>;

interface RequestConfig extends Omit<RequestInit, "body" | "method"> {
  params?: QueryParams;
  data?: unknown;
  timeout?: number;
}

class ApiError extends Error {
  constructor(public status: number, public data: any, message?: string) {
    super(
      message || data?.detail || data?.message || data?.email || "API Error"
    );
    this.name = "ApiError";
  }
}

export class FetchApi {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor() {
    const baseApi = envConfig.baseApi || "";
    const testApi = envConfig.testApi || "";

    this.baseURL = envConfig.isProduction ? baseApi : testApi;

    if (!this.baseURL) {
      throw new Error("API base URL is not configured");
    }

    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  public async request<T>(
    method: HttpMethod,
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const {
      params,
      data,
      headers,
      timeout = 15000,
      ...fetchOptions
    } = config || {};
    const fullURL = this.buildUrl(url, params);

    const requestConfig: RequestInit = {
      ...fetchOptions,
      method,
      headers: { ...this.defaultHeaders, ...headers },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await this.fetchWithTimeout(
        fullURL,
        requestConfig,
        timeout
      );

      if (!response.ok) {
        const errorData = await this.parseError(response);
        throw new ApiError(response.status, errorData);
      }

      return this.parseResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        0,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  private buildUrl(url: string, params?: QueryParams): string {
    const normalizedBase = this.baseURL.endsWith("/")
      ? this.baseURL
      : `${this.baseURL}/`;
    const normalizedUrl = url.startsWith("/") ? url.slice(1) : url;

    const urlObj = new URL(normalizedUrl, normalizedBase);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach((v) => urlObj.searchParams.append(key, String(v)));
        } else {
          urlObj.searchParams.append(key, String(value));
        }
      });
    }

    return urlObj.toString();
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError(408, `Request timed out after ${timeout}ms`);
      }
      throw error;
    }
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("Content-Type");
    return contentType?.includes("application/json")
      ? response.json()
      : (response.text() as Promise<T>);
  }

  private async parseError(response: Response): Promise<unknown> {
    try {
      return await this.parseResponse(response);
    } catch {
      return await response.json();
    }
  }

  public get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request("GET", url, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request("POST", url, { ...config, data });
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request("PUT", url, { ...config, data });
  }

  public delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request("DELETE", url, config);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.request("PATCH", url, { ...config, data });
  }

  public async withToken<T>(
    method: HttpMethod,
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const { accessToken } = await getToken();

    return this.request(method, url, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Token ${accessToken}`,
      },
    });
  }

  public getWithToken<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.withToken("GET", url, config);
  }

  public postWithToken<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.withToken("POST", url, { ...config, data });
  }

  public putWithToken<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.withToken("PUT", url, { ...config, data });
  }

  public deleteWithToken<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.withToken("DELETE", url, config);
  }

  public patchWithToken<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    return this.withToken("PATCH", url, { ...config, data });
  }

  public async photo<T>(url: string, formData?: FormData): Promise<T> {
    const { accessToken } = await getToken();

    try {
      if (!formData) throw new Error("Отстутвует фото");

      const res = await fetch(this.buildUrl(url), {
        method: "POST",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
        body: formData,
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
}

export const api = new FetchApi();
