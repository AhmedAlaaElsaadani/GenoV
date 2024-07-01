import axios from "axios";

const baseUrl = "https://genov.izitechs.com";

export default class ApiManager {
  // User Apia <-- Login, Register, Logout , Update Profile , Get Profile ,otpConfirm , ResendOtp , ForgotPassword , ResetPassword -->
  /**
   * log out user
   *
   * @param {string} token
   * @returns {object} response
   */
  static async logOut(token) {
    let axiosResult = await axios.post(
      baseUrl + "/accounts/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return axiosResult;
  }
  /**
   * log in user
   * @param {object} user
   * @returns {object} response
   */
  static async logIn(user) {
    const myHeaders = {
      "Content-Type": "application/json",
    };

    let axiosResult = await axios.post(baseUrl + "/accounts/login", user, {
      headers: myHeaders,
    });
    return axiosResult;
  }
  /**
   * register user
   * @param {object} user
   * @returns {object} response
   *
   */

  static async register(user) {
    const myHeaders = {
      "Content-Type": "application/json",
    };
    let axiosResult = await axios.post(baseUrl + "/accounts/register", user, {
      headers: myHeaders,
    });
    return axiosResult;
  }
  /**
   * Otp send confirmation
   * @param {string} token
   * @returns {object} response
   */
  static async sendOtp(token) {
    let axiosResult = await axios.post(
      baseUrl + "/accounts/SendOTPConfirmAccount",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return axiosResult;
  }
  /**
   * Otp Confirm
   * @param {object} user
   * @returns {object} response
   */
  static async otpConfirm(otp, token) {
    let axiosResult = await axios.post(
      baseUrl + `/accounts/ConfirmAccountOTP?otp=${otp}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return axiosResult;
  }
  /**
   * Update Profile
   * @param {object} user
   * @param {string} token
   * @returns {object} response
   *
   */
  static async updateProfile(user, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    console.log("HI");
    let axiosResult = await axios.put(
      baseUrl + "/accounts/updatecurrent",
      user,
      {
        headers: headers,
      }
    );
    return axiosResult;
  }
  /**
   * Get Profile
   * @param {string} token
   * @returns {object} response
   */
  static async getProfile(token) {
    let axiosResult = await axios.get(`${baseUrl}/accounts/currentuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return axiosResult;
  };
  /**
   * check if session is still valid
   * @param {string} token
   */
    static async checkIfSessionEnd(token) {
        let axiosResult = await axios.get(baseUrl + `/accounts/validateToken?token=${token}`);
        console.log(axiosResult);
        return axiosResult;
    }
    /**
     * send email to send reset password otp to user
     * @param {string} email
     * @returns {object} response
     * 
     */
    static async forgotPasswordSendOtpToEmail(email) {        
        let axiosResult = await axios.post(baseUrl + `/accounts/SendOTPResetPassword?email=${email}` );
        console.log(axiosResult);
        return axiosResult;
    }

  /**
   * Contact us
   * @param {object} data
   * @returns {object} response
   *
   */
  static async contactUs(data) {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let axiosResult = await axios.post(baseUrl + "/contact", data, config);
    console.log(axiosResult);
    return axiosResult;
  }
}
