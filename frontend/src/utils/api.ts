/**
 * API 요청을 처리하기 위한 유틸리티 함수들
 */

// Use window.location.origin to ensure requests work both in Docker and browser environments
const API_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.hostname}:8080/api`
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api");

/**
 * GET 요청 처리 함수
 */
export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

/**
 * POST 요청 처리 함수
 */
export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

/**
 * PUT 요청 처리 함수
 */
export const putData = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

/**
 * DELETE 요청 처리 함수
 */
export const deleteData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
