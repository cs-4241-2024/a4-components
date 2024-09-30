import BlueButton from "../default_components/BlueButton.jsx";

function LogoutButton(props) {
    return (
        <BlueButton id="logout" label="logout" onclick={()=> {
            console.log("logout");
            props.setType({loginType: "logout"})}}></BlueButton>
    );
}

export default LogoutButton;