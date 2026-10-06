import { useState } from 'react'
import { loginService } from "../service/loginService"
export function AdminLogin({ onLogin }) {
	const [formdata, setFormdata] = useState({
        username: "",
        password: ""
	})

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await loginService(formdata);
        console.log("SUCCESS:", response);
		onLogin();
    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
    }
};

    const handleChange = (e)=>{
		const { name, value } = e.target;
		setFormdata((currentData) => ({
			...currentData,
			[name]: value,
		}));
    }
	return (
		<main className="flex min-h-screen items-center justify-center bg-navbar-bg px-4 py-12 font-mono">
			<form className="w-full max-w-md border border-white/10 px-6 py-8 sm:px-10 sm:py-10" onSubmit={handleSubmit}>
				<p className="m-0 text-xs tracking-[0.18em] text-navbar-muted">ADMIN ACCESS</p>
				<h1 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-hero-heading sm:text-4xl">
					Welcome back
				</h1>

				<div className="mt-10 space-y-6">
					<label className="block text-sm text-navbar-muted">
						Username
						<input
							className="mt-2 block w-full border-b border-white/20 bg-transparent px-0 py-3 text-hero-heading outline-none transition-colors placeholder:text-navbar-muted focus:border-navbar-accent"
							type="text"
							name="username"
							autoComplete="username"
							placeholder="Enter your username"
                            value={formdata.username}
							onChange={handleChange}
						/>
					</label>

					<label className="block text-sm text-navbar-muted">
						Password
						<input
							className="mt-2 block w-full border-b border-white/20 bg-transparent px-0 py-3 text-hero-heading outline-none transition-colors placeholder:text-navbar-muted focus:border-navbar-accent"
							type="password"
							name="password"
							autoComplete="current-password"
							placeholder="Enter your password"
                            value={formdata.password}
							onChange={handleChange}
						/>
					</label>
				</div>

				<button
					className="mt-10 w-full border border-navbar-accent py-3 text-sm tracking-[0.08em] text-navbar-accent transition-colors hover:bg-navbar-accent hover:text-navbar-bg focus-visible:outline-2 focus-visible:outline-navbar-accent focus-visible:outline-offset-4"
					type="submit"
				>
					SIGN IN
				</button>
			</form>
		</main>
	)
}

export default AdminLogin
