
import { useState } from "react";
import { User } from "./components/User";
import { Admin } from "./components/Admin";
import { Moderator } from "./components/Moderátor";

function App() {
    const [oldal, setOldal] = useState<"user" | "admin" | "moderator">("user");

    return (
        <div className="container mt-4">

            <div className="mb-4">
                <button
                    className={`btn me-2 ${
                        oldal === "user" ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setOldal("user")}
                >
                    User oldal
                </button>

                <button
                    className={`btn me-2 ${
                        oldal === "admin" ? "btn-success" : "btn-outline-success"
                    }`}
                    onClick={() => setOldal("admin")}
                >
                    Admin oldal
                </button>

                <button
                    className={`btn me-2 ${
                        oldal === "moderator" ? "btn-warning" : "btn-outline-warning"
                    }`}
                    onClick={() => setOldal("moderator")}
                >
                    Moderátor oldal
                </button>
            </div>

            <hr />

            {oldal === "user" ? <User /> : oldal==="admin" ? <Admin /> : <Moderator/>}

        </div>
    );
}

export default App;
