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