export function Auth() {
  return (
    <>
      <h1>Register</h1>
      <form className="brandForm">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <label htmlFor="retype_password">Retype Password</label>
        <input type="password" name="retype_password" id="retype_password" />

        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />

        <button type="submit" className="secondColumn btn">
          Register
        </button>
      </form>
    </>
  );
}
