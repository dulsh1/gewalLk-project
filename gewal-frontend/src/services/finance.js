// Existing code
export const createFinance = async (data) => {
  try {
    // Filter out empty string values for ObjectId fields
    const cleanedData = { ...data };
    if (cleanedData.property === "") delete cleanedData.property;
    if (cleanedData.user === "") delete cleanedData.user;

    const response = await fetch('http://localhost:5001/api/finance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedData)
    });

    // Parse the response body
    const responseData = await response.json();
    
    if (!response.ok) {
      // Create a more informative error with the server's error message
      const errorMessage = responseData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return responseData;
  } catch (error) {
    console.error('Error creating finance:', error);
    throw error;
  }
};

// New functions for admin finance page

export const getAllFinances = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/finance', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching all finances:', error);
    throw error;
  }
};

export const deleteFinance = async (id) => {
  try {
    const response = await fetch(`http://localhost:5001/api/finance/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting finance:', error);
    throw error;
  }
};

// New function for approving finance applications
export const approveFinance = async (id) => {
  try {
    const response = await fetch(`http://localhost:5001/api/finance/${id}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error approving finance:', error);
    throw error;
  }
};