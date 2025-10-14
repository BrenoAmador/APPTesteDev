function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Bem vindo, {localStorage.getItem("user")}</p>
    </div>
  );
}

export default Dashboard;
