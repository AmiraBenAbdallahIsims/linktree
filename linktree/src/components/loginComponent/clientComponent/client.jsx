import "./client.css";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

export default function Client() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('Choose File');
    const [sex, setSex] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(null);
    const [emailValid, setEmailValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const [loading , setLoading] = useState(null)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setFileName(event.target.files[0].name);
    };

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameValid(value.length >= 5);
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailValid(value.length >0 );
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordValid(value.length >=10 );
    };

    
     async function fetchData() {
        setLoading(true);
         const res = await fetch('http://localhost:3001/api/signup', {
         method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
            body: JSON.stringify({ username , email , password, sex }),
         });
         
         const data = await res.json();
         setLoading(false);
     }


    const formSubmit = (data) => {
        console.log(data);
    };

    const handleError = (errors) => {
        console.log(errors);
    };

    const registerOptions = {
        name: { required: "Username cannot be blank" ,  minLength : {value : 5 , message : "Username must be at least 5 characters"} },
        email: { required: "Email cannot be blank" },
        password: {
            required: "Password is required",
            minLength: {
                value: 10,
                message: "Password must be at least 10 characters",
            },
        },
    };

    return (
        <div className="client-form">
            <div>
                <form className="c-form-inputs" onSubmit={handleSubmit(formSubmit, handleError)}>
                    <input
                        className={`c-input ${usernameValid === false ? 'error' : 'valid'}`}
                        type="text"
                        placeholder="Username"
                        name="name"
                        {...register("name", registerOptions.name)}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                    <input
                        className={`c-input ${emailValid === false ? 'error' : ''} ${emailValid === true ? 'valid' : ''}`}
                        type="email"
                        placeholder="Email"
                        name="email"
                        {...register("email", registerOptions.email)}
                        onChange = {handleEmailChange}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                    <input
                        className={`c-input ${passwordValid === false ? 'error' : ''} ${passwordValid === true ? 'valid' : ''}`}
                        type="password"
                        placeholder="Password"
                        name="password"
                        {...register("password", registerOptions.password)}
                        onChange = {handlePasswordChange}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                    <div className="file-section">
                        <label className="gender">Choose your profile image</label>
                        <div className="custom-file-input">
                            <button type="button" onClick={handleButtonClick}>
                                {fileName}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <label className="gender">Choose your gender</label>
                    <div className="gender-list">
                        <div>
                            <label>Male</label>
                            <input type="radio" value="m" name="sex" onChange={() => setSex('m')} />
                        </div>
                        <div>
                            <label>Female</label>
                            <input type="radio" value="f" name="sex" onChange={() => setSex('f')} />
                        </div>
                    </div>
                    <button onClick={fetchData} className="c-create-button" type="submit">{loading ? (<img className="loading-img" src="https://i.gifer.com/ZKZg.gif"></img>) : "Create Account"}</button>
                </form>
            </div>
        </div>
    );
}
