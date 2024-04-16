export default {
  authenticateUser: (token: string) => {
    localStorage.setItem("HDMovieAuthToken", token);
  },
  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  isUserAuthenticated: (): boolean =>
    localStorage.getItem("HDMovieAuthToken") !== null,
  /**
   * Deauthenticate a user. Remove token from Local Storage.
   *
   */
  deauthenticateUser: () => {
    localStorage.removeItem("HDMovieAuthToken");
  },
  /**
   * Get a token value.
   *
   * @returns {string}
   */
  getToken: (): string | null => localStorage.getItem("HDMovieAuthToken"),
};
