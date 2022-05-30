const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			latestProjects: null,
			companyProjects: null,
			token: null,
			currentUser: null,
			currentCompany: null,
			message: null,
			API_URL: "https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io",
			projectPostulaciones: null,
			userPostulaciones: null,
		},
		actions: {
			getProjects: () => {
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/projects`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ projects: data });
					});
			},

			getCompanyProjects: (id) => {
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/companies/${id}/projects`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ companyProjects: data });
					});
			},
			getPostulacionesByProject: (id) => {
				console.log("hola");
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/projects/${id}/postulaciones`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ projectPostulaciones: data });
					});
			},

			deleteProject: (id) => {
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/projects/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getStore().token}`,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ message: data.message });
					});
			},

			getPostulacionesByUser: (id) => {
				//console.log(id)
				//console.log("hola");
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/projects/${id}/postulaciones_user`)
					.then((response) => response.json())
					.then((data) => {
						//console.log(data);
						setStore({ userPostulaciones: data });
					});
			},

			createPostulation: (id) => {
				const { API_URL, currentUser } = getStore();
				fetch(`${API_URL}/api/project/${id}/apply`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ user_id: currentUser?.id }),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log("Success:", data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},

			getLatestProjects: () => {
				const { API_URL } = getStore();
				fetch(`${API_URL}/api/projects/latest`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setStore({ latestProjects: data });
					});
			},

			logout: () => {
				sessionStorage.removeItem("token");
				setStore({ token: null });
				sessionStorage.removeItem("user");
				setStore({ currentUser: null });
				sessionStorage.removeItem("company");
				setStore({ currentCompany: null });
			},

			syncTokenFromSessionStore: () => {
				const currentUser = JSON.parse(sessionStorage.getItem("user"));

				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined)
					setStore({ token, currentUser });
			},
			syncCompanyTokenFromSessionStore: () => {
				const currentCompany = JSON.parse(sessionStorage.getItem("company"));
				const token = sessionStorage.getItem("token");
				if (token && token != "" && token != undefined)
					setStore({ token, currentCompany });
			},

			login: async (email, password) => {
				console.log({
					email: email,
					password: password,
				});
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const resp = await fetch(
						"https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io/api/token",
						opts
					);
					console.log(resp);
					if (resp.status !== 200) {
						alert("There was an error");
						return false;
					}
					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("user", JSON.stringify(data.user));
					setStore({ token: data.access_token, currentUser: data.user });
					return true;
				} catch (error) {
					console.error("There was an error!");
				}
			},
			companyLogin: async (email, password) => {
				console.log({
					email: email,
					password: password,
				});
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const resp = await fetch(
						"https://3001-xetnal-finalproject-kainuymmez4.ws-us46.gitpod.io/api/company_token",
						opts
					);
					console.log(resp);
					if (resp.status !== 200) {
						alert("There was an error");
						return false;
					}
					const data = await resp.json();
					console.log("this came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("company", JSON.stringify(data.company));
					setStore({ token: data.access_token, currentCompany: data.company });
					return true;
				} catch (error) {
					console.error("There was an error!");
				}
			},
			getMinimumValue: (minimum_value) => {
				const { currentUser } = getStore();
				let userValue =
					currentUser?.salary + currentUser?.side_income - currentUser?.deudas;
				return userValue >= minimum_value;
			},
		},
	};
};

export default getState;
