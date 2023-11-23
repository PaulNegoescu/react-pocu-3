import { useState } from 'react';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  function handleInputChange(e) {
    // const newValues = { ...values };
    // newValues[e.target.name] = e.target.value;
    // setValues(newValues);
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // const dataForServer = {...values};
    // delete dataForServer.retypePassword;
    const { retypePassword, ...dataForServer } = values;

    const newErrors = { ...errors };
    let hasErrors = false;
    // if(isEmail(values.email)) {
    //   newErrors.email = 'Please provide a valid email address.';
    // }
    if (values.email.trim() === '') {
      hasErrors = true;
      newErrors.email = 'The email address is required.';
    }
    if (values.password !== values.retypePassword) {
      hasErrors = true;
      newErrors.retypePassword = 'The passwords do not match.';
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const data = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(dataForServer),
    }).then((res) => res.json());
    console.log(data);
  }

  return (
    <>
      <h1>Register</h1>
      <form className="brandForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="secondColumn">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="secondColumn">{errors.password}</p>}

        <label htmlFor="retypePassword">Retype Password</label>
        <input
          type="password"
          name="retypePassword"
          id="retypePassword"
          value={values.retypePassword}
          onChange={handleInputChange}
        />
        {errors.retypePassword && (
          <p className="secondColumn">{errors.retypePassword}</p>
        )}

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={values.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <p className="secondColumn">{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={values.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <p className="secondColumn">{errors.lastName}</p>}

        <button type="submit" className="secondColumn btn">
          Register
        </button>
      </form>
    </>
  );
}
