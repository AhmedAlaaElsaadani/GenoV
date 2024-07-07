import axios from "axios";
import { HfInference } from "@huggingface/inference";
const baseUrl = "https://ppi.izitechs.com";
const inference = new HfInference("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");
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
  }
  /**
   * check if session is still valid
   * @param {string} token
   */
  static async checkIfSessionEnd(token) {
    let axiosResult = await axios.get(
      baseUrl + `/accounts/validateToken?token=${token}`
    );
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
    let axiosResult = await axios.post(
      baseUrl + `/accounts/SendOTPResetPassword?email=${email}`
    );
    console.log(axiosResult);
    return axiosResult;
  }
  /**
   * confirm otp for reset password
   * @param {string} otp
   * @param {string} email
   * @returns {object} response
   */
  static async confirmOtpForResetPassword(otp, email) {
    let axiosResult = await axios.post(
      baseUrl + `/accounts/ConfirmResetPasswordOTP?OTP=${otp}&email=${email}`
    );
    console.log(axiosResult);
    return axiosResult;
  }
  /**
   * reset password
   * @param {object} data
   * @returns {object} response
   */
  static async resetPassword(email, password, token) {
    let data = {
      email: email,
      new_password: password,
      token: token,
    };

    let axiosResult = await axios.post(
      baseUrl + `/accounts/ResetPassword`,
      data
    );
    console.log(axiosResult);
    return axiosResult;
  }
  // services Api <-- getPreCalc--> <-- search -->  <-- useModel --> <-- contactUs -->
  /**
   * get precalc
   * @returns {object} response
   */
  static async getPreCalc(param) {
    let axiosResult = await axios.get(
      baseUrl + "/search/precalculated?" + param
    );
    console.log(axiosResult);
    return axiosResult;
  }
  /**
   * search for protein
   * @param {string} param
   * @returns {object} response
   */
  static async search(param) {
    let axiosResult = await axios.post(
      baseUrl + `/search?${param}&ignore=true`
    );
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

  /**
   * Sends a user message to the model and retrieves the response.
   * @param {string} userMessage - The message from the user.
   * @returns {Promise<string>} - The model's response.
   */
  static async getChatCompletion(userMessage) {
    let response = "";

    try {
      for await (const chunk of inference.chatCompletionStream({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 500,
      })) {
        response += chunk.choices[0]?.delta?.content || "";
      }

      return response;
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      return "Sorry, I couldn't process your request.";
    }
  }
  /**
   * get Chain for protein id
   * @param {string} proteinId
   * @returns {object} response
   */
  static async getChain(proteinId) {
    let axiosResult = await axios.get(baseUrl + `/Protien/GetProteinChainIdentifiers/${proteinId}`);
    console.log(axiosResult);
    return axiosResult;
  }
  /**
   * use model to predict binding site
   * @param {object} data
   * @returns {object} response
   * 
   */
  static async useModel(proteinId, chainId, token) {
    let axiosResult = await axios.post(baseUrl + `/search?PId=${proteinId}&ChainId=${chainId}`, {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    
    });
    console.log(axiosResult);
    return axiosResult;
  }
}
