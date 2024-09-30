import blueButton from "../default_components/BlueButton.jsx";
import BlueButton from "../default_components/BlueButton.jsx";

function LoginButtons(props) {
    return (
        <div>
            <BlueButton id="login" label="login" onclick={()=> {
                props.setType({ loginType : "login"})}
            }></BlueButton>
            <BlueButton id="register" label="register" onclick={()=> {
                props.setType({ loginType : "register"})}
            }></BlueButton>
        </div>
    );
}

export default LoginButtons;