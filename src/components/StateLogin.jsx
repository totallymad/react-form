import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [didEdit, setIsEdit] = useState({
  //   email: false,
  //   password: false,
  // });

  // валидация при нажатии каждой клавиши
  // const emailIsInvalid =
  //   enteredValues.email !== "" && !enteredValues.email.includes("@");

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => {
    //... функции валидации
    return isEmail(value) && isNotEmpty(value);
  });

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBLur,
    hasError: passwordHasError,
  } = useInput("", (value) => {
    return hasMinLength(value, 6);
  });

  // Более продвинутая валидация, которая работает, если пользователь потерял фокус на инпуте
  // const emailIsInvalid =
  //   didEdit.email &&
  //   !isEmail(enteredValues.email) &&
  //   !isNotEmpty(enteredValues.email);
  // const passwordIsInvalid =
  //   didEdit.password &&
  //   !hasMinLength(enteredValues.password, 6) &&
  //   !isNotEmpty(enteredValues.password);

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);

    // Хорошей практикой будет проводить проверку ещё здесь, так как
    // если пользователь проигнорирует подсказки, то в итоге он отравит просто пустые данные

    // сброс значений если используется стейт
    // setEnteredValues({
    //   email: "",
    //   password: "",
    // });
  }

  // function handleInputChanhe(id, value) {
  //   setEnteredValues((prevValues) => ({
  //     ...prevValues,
  //     [id]: value,
  //   }));
  //   setIsEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [id]: false,
  //   }));
  // }

  // function handleInputBlur(id) {
  //   setIsEdit((prevEdit) => ({
  //     ...prevEdit,
  //     [id]: true,
  //   }));
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email" // встроенная фича для отслеживания потери фокуса на инпуте
          // onBlur={() => handleInputBlur("email")}
          // onChange={(event) => handleInputChanhe("email", event.target.value)}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password" // встроенная фича для отслеживания потери фокуса на инпуте
          onBlur={handlePasswordBLur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
