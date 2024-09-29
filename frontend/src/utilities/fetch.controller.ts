import { APIRoutes } from "../constants/apiRoutes.constant";


interface FetchOptions {
    body?: Record<string, any>;
    query?: Record<string, string>;
    param?:string

  }
  
  export const fetchAPI = async (path: string, options: FetchOptions): Promise<any> => {
    const { body, query,param } = options;
    const token=localStorage.getItem("token")
    const {url,method}=APIRoutes.get(path)||{url:"",method:""}
  
    // Construct query parameters for GET requests
    const queryString = query
      ? '?' +
        new URLSearchParams(query).toString() // Converts params object to query string
      : '';
  
    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add Authorization header if token is provided
      },
    };
  
    // Add body to the request if it's a POST request
    if (method === 'POST' || body) {
      fetchOptions.body = JSON.stringify(body); // Convert body to JSON string
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}${url}${param?param:""}${queryString}`, fetchOptions);
  
      // Check if the response is OK (status in the range 200-299)
      console.log(response)
      if (!response.ok) {
        if(response.status===401){
            localStorage.removeItem("token")
            window.location.href="/login"
           
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Rethrow the error for further handling
    }
  };
  