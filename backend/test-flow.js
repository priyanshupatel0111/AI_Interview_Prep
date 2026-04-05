async function run() {
  try {
    // 1. Create user
    console.log("Signing up...");
    let token;
    let res = await fetch("http://localhost:9001/api/auth/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "TestUser",
            email: "test@example.com",
            password: "password123"
        })
    });
    
    let data = await res.json();
    if (!res.ok) {
        if (data.message === "User already exists") {
            res = await fetch("http://localhost:9001/api/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: "test@example.com",
                    password: "password123"
                })
            });
            data = await res.json();
            token = data.token;
        } else {
            throw new Error(data.message);
        }
    } else {
        token = data.token;
    }

    console.log("Got token: ", token);

    // 2. Create Session
    console.log("Creating session...");
    res = await fetch("http://localhost:9001/api/sessions/create", {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            role: "frontend",
            experience: "0",
            questions: []
        })
    });

    data = await res.json();
    console.log("Success:", JSON.stringify(data, null, 2));

  } catch (error) {
    console.log("API Error:", error);
  }
}

run();
