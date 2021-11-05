interface Result {
  success: boolean;
  errorMsg?: string;
  data: any;
}

export const getResponseData = (data: any, errorMsg?: string): Result => {
  if (errorMsg) {
    return {
      success: false,
      errorMsg,
      data
    }
  } else {
    return {
      success: true,
      data
    };
  };
};