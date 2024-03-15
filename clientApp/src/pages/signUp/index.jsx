import axios from "axios";
import { useState, useEffect } from "react";
import { Input } from "./components/input";

export function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [rePassword, setRepassword] = useState();

  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalErrors, setGeneralErrors] = useState();

  useEffect(() => {
    setErrors((lastErrors) => {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  }, [username]);

  useEffect(() => {
    setErrors((lastErrors) => {
      return {
        ...lastErrors,
        email: undefined,
      };
    });
  }, [email]);

  useEffect(() => {
    setErrors((lastErrors) => {
      return {
        ...lastErrors,
        password: undefined,
      };
    });
  }, [password]);

  // const rePasswordError = useMemo(()=>{
  //   if(rePassword?.length && rePassword != password)
  //     return 'Passwords do not match.'
  //   return ''
  // },[rePassword, password])
  useEffect(() => {
    setErrors((lastErrors) => {
      return {
        ...lastErrors,
        rePassword:
          rePassword?.length && rePassword != password
            ? "Passwords do not match."
            : undefined,
      };
    });
  }, [rePassword, password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccessMessage();
    setGeneralErrors();

    await axios
      .post("/api/v1/users/create", {
        username,
        password,
        email,
      })
      .then((res) => {
        console.log(res);
        setSuccessMessage("Kayıt Başarılı");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data && err.response.data.statusCode == "400") {
          setErrors(err.response.data.validationErrors);
        } else {
          setGeneralErrors("Unexpected errors occured. Please try again.");
        }
      })
      .finally(() => {
        setApiProgress(false);
      });
  };

  return (
    <div className="container vh-100 d-flex align-items-center">
      <form className="col-md-6 offset-md-3 card" onSubmit={onSubmit}>
        <div className="card-header">
          <h1 className="text-center fw-semibold">Sign Up</h1>
        </div>
        <div className="card-body">
          <br />
          <Input
            id="username"
            label="Username"
            type="text"
            error={errors.username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Input
            id="rePassword"
            label="Password Repeat"
            type="password"
            error={errors.rePassword}
            onChange={(event) => setRepassword(event.target.value)}
          />
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {generalErrors && (
            <div className="alert alert-danger" role="alert">
              {generalErrors}
            </div>
          )}
          <button
            disabled={!password || password !== rePassword}
            className="btn btn-primary w-100"
          >
            {apiProgress && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            <span>SignUp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
