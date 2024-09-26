export default function Login() {   
    
    const submit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        console.log(form.username)
        await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username.value,
            password: form.password.value}),
        }).then(async function (response) {
            let result = await response.json();
            if (result.success) {
                window.location.href = result.redirectUrl; 
            } else {
                console.error(result.message); 
            }
        });
      };

    return (
        <div>
        <h1 className="nes-text is-primary">
            Login
        </h1>
        <p className="nes-text is-warning">
            Note: Submitting a username-password combination that doesn't already exist in the database will create an account with those credentials.
        </p>
        <form onSubmit={submit}>
            <input type="text" name="username" placeholder="Username" className="nes-balloon" />
            <input type="password" name="password" placeholder="Password" className="nes-balloon" />
            <button type="submit" className="nes-btn">Submit</button>
        </form>
        </div>
    );
}