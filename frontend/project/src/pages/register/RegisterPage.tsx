import { useState } from "react";
import { registerInputs } from "../../utilities/Arrays";
import type { RegisterUserType } from "../../utilities/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function RegisterPage() {
  const [inpValues, setInpValues] = useState<RegisterUserType>({
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { fields } = useSelector((state: RootState) => state.loadingSlice);
  console.log("fields", fields);
  const dispatch = useDispatch();
  /* function */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const { value } = e.target;
    setInpValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      username: inpValues.username,
      email: inpValues.email,
      password: inpValues.password,
      rePassword: inpValues.rePassword,
    };
    dispatch({ type: "Fetch-REGISTER-USERS", payload: newUser });
  };

  /*  */

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleForm}>
        <div>
          {registerInputs &&
            registerInputs.map((inp, index) => {
              return (
                <label htmlFor={inp.name} key={index}>
                  <p>{inp.label}</p>

                  <input
                    type={inp.type}
                    name={inp.name}
                    id={inp.name}
                    placeholder={inp.placeholder}
                    value={inpValues[inp.name as keyof RegisterUserType]}
                    onChange={(e) => handleInputChange(e, inp.name)}
                    style={{
                      border:
                        fields.includes(inp.name) || fields.includes("all")
                          ? "2px solid red"
                          : "1px solid black",
                    }}
                  />
                </label>
              );
            })}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
