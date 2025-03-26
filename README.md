Overview:
Dog Store full stack Web Applicaiton.



Features:

SidebarCart component-Context API Integration – Utilizes React’s useContext to manage and retrieve cart-related data.
	•	State Management – Implements useState to manage UI interactions like pickup options.
	•	Local Storage Handling – Retrieves and stores the user’s selected pickup option in localStorage.
	•	Dynamic Rendering – Conditionally renders cart items and total prices based on cart contents.
	•	React Router Integration – Uses Link from react-router-dom for product navigation.
	•	Event Handling – Implements handlers for increasing/decreasing quantity, removing items, and checkout actions.
	•	CSS Styling – Uses SidebarCart.css for structured styling and responsive UI design.
	•	Reusable UI Components – Breaks down UI elements into modular sections for maintainability.
	•	Performance Optimization – Avoids unnecessary re-renders by selectively updating state.


 JWT Authentication & Authorization
	•	JWT Token-based Authentication: Secure user authentication using JWT (JSON Web Token) with jwt.sign for generating tokens and jwt.verify for token validation. The token is stored in a secure, HTTP-only cookie, preventing access from JavaScript on the client side.
	•	Token Expiry: Tokens have a set expiration time (e.g., 365d for regular users and 1h for admin users), ensuring they remain valid only for a limited time.
	•	Role-based Access Control: Admin-specific actions are protected with JWT and a separate token (adminToken), ensuring that only authorized users can perform sensitive tasks.

 Password Security
	•	Password Hashing: User and admin passwords are hashed using bcrypt before storing them in the database. This ensures that passwords are not saved in plaintext.
	•	Password Comparison: bcrypt.compare is used to securely check if the entered password matches the stored hash.
	•	Account Locking: The system locks accounts after a predefined number of failed login attempts, preventing brute-force attacks (MAX_FAILED_ATTEMPTS and LOCK_TIME).
. Secure Cookie Management
	•	HTTP-only Cookies: JWT tokens are set as HTTP-only cookies, which are not accessible via JavaScript, mitigating XSS (Cross-Site Scripting) risks.
	•	Secure Cookies in Production: Cookies are set with the secure flag to ensure they are only sent over HTTPS in production environments.
	•	SameSite Cookies: The SameSite attribute is set to Strict, helping prevent CSRF (Cross-Site Request Forgery) attacks.

 Input Validation & Data Sanitization
	•	Email, Address, and Phone Validation: The code uses regex to validate user input for emails, phone numbers, and addresses, ensuring the correct format and preventing injection attacks.
	•	Field Constraints: The schema enforces validation on fields like zipcode, state, and country, ensuring only valid data is saved to the database.

 Error Handling & Logging
	•	Detailed Error Responses: Custom error messages are returned when authentication or input validation fails, providing clear feedback to users while avoiding generic messages that might expose vulnerabilities.
	•	Logging: Errors, such as failed logins or unexpected issues, are logged for auditing and debugging, without exposing sensitive data (e.g., passwords).

. Secure Payment Handling
	•	Stripe Integration: The code integrates with Stripe for payment processing, securely handling payment intents using the Stripe API. Amount validation ensures that invalid or malicious amounts are not processed.



SCREENSHOTS:

![dogarrivals](https://github.com/user-attachments/assets/5ee7d92a-9c90-4bc1-9cac-a01876ddc69c)





website: https://dogstoreclient.onrender.com
