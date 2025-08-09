import APIService from 'frontend/services/api.service';
import { AccessToken, ApiResponse } from 'frontend/types';
// Replace `any` with your real type
type TaskType = {
  id: string;
  title: string;
  description?: string;
};

type TaskResponse = {
  items: TaskType[];
  [key: string]: any; // everything else is "whatever"
};

type CommentType = {
  id: string;
  text: string;
};

type CommentResponse = {
  items: CommentType[];
  [key: string]: any; // everything else is "whatever"
};
export default class TaskService extends APIService {
  getTasks = async (userAccessToken: AccessToken): Promise<ApiResponse<TaskResponse>> =>
    this.apiClient.get(`/accounts/${userAccessToken.accountId}/tasks`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });

    createTask = async (
    userAccessToken: AccessToken,
    title: string,
    description: string
  ): Promise<ApiResponse<any>> =>
    this.apiClient.post(
      `/accounts/${userAccessToken.accountId}/tasks`,
      { title, description },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      }
    );

    getComments = async (userAccessToken: AccessToken, task_id: string): Promise<ApiResponse<CommentResponse>> =>
    this.apiClient.get(`/accounts/${userAccessToken.accountId}/tasks/${task_id}/comments`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });

    createComment = async (
    userAccessToken: AccessToken,
    task_id: string,
    text: string
  ): Promise<ApiResponse<any>> =>
    this.apiClient.post(
      `/accounts/${userAccessToken.accountId}/tasks/${task_id}/comments`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      }
    );
}
