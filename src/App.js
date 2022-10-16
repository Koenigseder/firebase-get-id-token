import "./App.css";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { Button, Col, Input, Typography } from "antd";
import { useState } from "react";

function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        user.getIdToken(true).then(function (idToken) {
          setResult(idToken);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setResult(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <Col span={5} style={{ marginTop: "1rem", marginLeft: "1rem" }}>
      <Input
        placeholder="Email"
        value={email}
        onChange={(value) => setEmail(value.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(value) => setPassword(value.target.value)}
        style={{ marginTop: "1rem" }}
      />
      <Button
        type="primary"
        onClick={() => handleSignIn(email, password)}
        style={{ marginTop: "1rem" }}
      >
        Login
      </Button>
      <Typography style={{ marginTop: "1rem" }}>{result}</Typography>
    </Col>
  );
}

export default App;
