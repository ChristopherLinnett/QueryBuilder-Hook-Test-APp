import { AxiosInstance } from "axios";
import { ServerException } from "../../core/errors/customExceptions";

class ApiDatasource {
    constructor(private client: AxiosInstance) {}
    async get(url: string, params?: Record<string, any>): Promise<Record<string, any>> {
        try {
            const config = {
                params,
                headers: {'Content-Type': 'application/json'}
            };
            const response = await this.client.get(url, config);
            return response.data;
        } catch (error: any) {
            console.error('Request failed:', error.response?.status, error.response?.data || error.message);
            throw new ServerException(`Error fetching data: ${error.message}`);
        }
    }
    async post(url: string, data: Record<string, any>): Promise<Record<string, any>> {
        try {
            const response = await this.client.post(url, data);
            return response.data
        } catch (error) {
            throw new ServerException(`Error posting data: ${error}`);
        }
    }
    async put(url: string, data: Record<string, any>): Promise<Record<string, any>> {
        try {
            const response = await this.client.put(url, data);
            return response.data
        } catch (error) {
            throw new ServerException(`Error putting data: ${error}`);
        }
    }
    async delete(url: string): Promise<Record<string, any>> {
        try {
            const response = await this.client.delete(url);
            return response.data
        } catch (error) {
            throw new ServerException(`Error deleting data: ${error}`);
        }
    }
}

export default ApiDatasource;