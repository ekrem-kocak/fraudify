import { useState, useEffect } from "react";
import { Input } from "./components/input";
import { LanguageSelector } from "../../shared/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { signUp } from "./api";

export function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [rePassword, setRepassword] = useState();

  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalErrors, setGeneralErrors] = useState();

  const { t } = useTranslation();

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
            ? t("passwordMissMatch")
            : undefined,
      };
    });
  }, [rePassword, password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setSuccessMessage();
    setGeneralErrors();

    await signUp({
      username,
      email,
      password,
    })
      .then((res) => {
        console.log(res);
        setSuccessMessage(t("signUpSuccess"));
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data && err.response.data.statusCode == "400") {
          setErrors(err.response.data.validationErrors);
        } else {
          setGeneralErrors(t("unexpectedError"));
        }
      })
      .finally(() => {
        setApiProgress(false);
      });
  };

  return (
    <div className="container vh-100 d-flex align-items-center">
      <form className="col-md-6 offset-md-3 " onSubmit={onSubmit}>
        <div className="card">
          <div className="card-header">
            <h1 className="text-center fw-semibold">{t("signUp")}</h1>
          </div>
          <div className="card-body">
            <br />
            <Input
              id="username"
              label={t("username")}
              type="text"
              error={errors.username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Input
              id="email"
              label={t("email")}
              type="email"
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              id="password"
              label={t("password")}
              type="password"
              error={errors.password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Input
              id="rePassword"
              label={t("rePassword")}
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
              <span className="text-uppercase">{t("signUp")}</span>
            </button>
          </div>
        </div>

        <LanguageSelector className="mt-2" />
      </form>
    </div>
  );
}
