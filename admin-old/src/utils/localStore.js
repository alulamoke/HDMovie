export default {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  authenticateUser: (token) => {
    localStorage.setItem('HDMovieAdminToken', token);
  },

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  isUserAuthenticated: () => localStorage.getItem('HDMovieAdminToken') !== null,

  /**
   * Deauthenticate a user. Remove token and email from Local Storage.
   *
   */
  deauthenticateUser: () => {
    localStorage.removeItem('HDMovieAdminToken');
  },
  /**
   * Get a token value.
   *
   * @returns {string}
   */
  getToken: () => localStorage.getItem('HDMovieAdminToken'),
};
